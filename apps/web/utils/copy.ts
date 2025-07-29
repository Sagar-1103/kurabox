import { toast } from "sonner";

export const handleCopy = (data:string,setCopied:(val:boolean)=>void,message:{title:string,description:string}) => {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard
        .writeText(data)
        .then(() => {
          setCopied(true);
          toast.success(message.title, {
            description: message.description,
          });
          setTimeout(() => setCopied(false), 1000);
        })
        .catch(() => {
          fallbackCopy(data,setCopied,{title:message.title,description:message.description});
        });
    } else {
      fallbackCopy(data,setCopied,{title:message.title,description:message.description});
    }
  };

  const fallbackCopy = (data:string,setCopied:(val:boolean)=>void,message:{title:string,description:string}) => {
    try {
      const textarea = document.createElement("textarea");
      textarea.value = data;
      textarea.style.position = "fixed";
      document.body.appendChild(textarea);
      textarea.focus();
      textarea.select();

      const success = document.execCommand("copy");
      document.body.removeChild(textarea);

      if (success) {
        setCopied(true);
        toast.success(message.title, {
          description: message.description,
        });
        setTimeout(() => setCopied(false), 1000);
      } else {
        throw new Error("Fallback copy failed");
      }
    } catch (err) {
      toast.error("Copy failed", {
        description: "Please manually copy the phrase.",
      });
    }
  };