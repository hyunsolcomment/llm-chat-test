import { ChatPromptWrapper } from "node-llama-cpp";

export class MyCustomChatPromptWrapper extends ChatPromptWrapper {
    public readonly wrapperName: string = "MyCustomChat";
    
    public override wrapPrompt(prompt: string, {systemPrompt, promptIndex}: {systemPrompt: string, promptIndex: number}) {
        if (promptIndex === 0) {
            return "SYSTEM: " + systemPrompt + "\nUSER: " + prompt + "\nASSISTANT:";
        } else {
            return "USER: " + prompt + "\nASSISTANT:";
        }
    }

    public override getStopStrings(): string[] {
        return ["USER:"];
    }

    public override getDefaultStopString(): string {
        return "USER:";
    }
}