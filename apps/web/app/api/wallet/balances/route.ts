import axios from "axios";
import { NextResponse } from "next/server";
import redis from "utils/redis";

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

export async function POST(req: Request){

    const {tokens,mode} = await req.json();;
    if (!tokens || !mode) {
        return NextResponse.json({ error: "Missing fields" },{ status: 401 });
    }

    const results = await Promise.all(
        tokens.map(async(token:Token)=>{
            const cacheKey = `bal:${mode}:${token.chain}:${token.publicKey}`;
            const cached = await redis.get(cacheKey);
            if (cached) {
                return cached;
            }
            const network = networks[`${token.chain}`];
            const url = `https://${network.name}-${mode==="mainnet"?"mainnet":network.testNet}.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_API_KEY}`;
            const response = await axios.post(url,{
                jsonrpc: "2.0",
                id: 1,
                method: network.method,
                params: token.chain==="solana"?[token.publicKey]:[token.publicKey,"latest"],
            });
            const resp = await response.data;
            const result = {chain:token.chain,balance:network.calculate(resp)};
            await redis.setex(cacheKey, 120, JSON.stringify(result));
            return result;
        })
    )

    return NextResponse.json({success:200,results,message:"Balances fetched successfully"});
}