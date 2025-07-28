import { Request, Response } from "express";
import dotenv from "dotenv";
import axios from "axios";
dotenv.config();

interface Token {
    chain:"solana"|"polygon"|"ethereum";
    publicKey:string;
}

const networks = {
    solana:{name:"solana",testNet:"devnet",method:"getBalance",calculate:calculateSolBalance},
    polygon:{name:"polygon",testNet:"amoy",method:"eth_getBalance",calculate:calculateEthAndMaticBalance},
    ethereum:{name:"eth",testNet:"sepolia",method:"eth_getBalance",calculate:calculateEthAndMaticBalance},
}

type Mode = "mainnet"|"testNet";

function calculateSolBalance(resp:any) {
    const bal = resp.result.value;
    return Number(bal) / Number(BigInt("1000000000"));
}

function calculateEthAndMaticBalance(resp:any) {
    const balanceInHex = resp.result;
    const bal = BigInt(balanceInHex);
    const divisor = BigInt("1000000000000000000");
    return (Number(bal) / Number(divisor));
}

export const getBalances = async(req:Request,res:Response) => {
    const tokens:Token[] = req.body.tokens;
    const mode:Mode = req.body.mode;
    const results = await Promise.all(
        tokens.map(async(token)=>{
            const network = networks[`${token.chain}`];
            const url = `https://${network.name}-${mode==="mainnet"?"mainnet":network.testNet}.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`;
            const response = await axios.post(url,{
                jsonrpc: "2.0",
                id: 1,
                method: network.method,
                params: token.chain==="solana"?[token.publicKey]:[token.publicKey,"latest"],
            });
            const resp = await response.data;
            return {chain:token.chain,balance:network.calculate(resp)};
        })
    )
    
    res.status(200).json({success:true,results,message:"Balances fetched successfully"});
}