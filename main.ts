import path from "path";
import {LlamaModel, LlamaContext, LlamaChatSession} from "node-llama-cpp";

const __dirname = path.resolve();

/** 로드할 LLM 모델 */
const MODEL       = "Lexi-Llama-3-8B-Uncensored_Q4_K_M"

/** 1회 생성 시 최대 글자 수 */
const MAX_TOKEN   = 200

/** 
 * 얘가 높으면 GPU 메모리 사용량이 증가함 
 * 
 * 너무 작게 설정할 경우, GPU가 처리하지 못한 레이어를 CPU 메모리에서 처리하게 됨.
 */
const GPU_LAYERS  = 20

/** 모델의 창의성 (낮을수록 일관된 출력, 높을수록 더 무작위적인 출력) */
const TEMPERATURE = 0.7

async function start() {
    const model = new LlamaModel({
        modelPath   : path.join(__dirname, "models", MODEL+".gguf"),
        temperature : TEMPERATURE,
        gpuLayers   : GPU_LAYERS,

    });
    const context = new LlamaContext({model});
    const session = new LlamaChatSession({context});

    /** AI에게 말하기 */
    async function sayToAI(message: string) {
        const a = await session.prompt(message, { maxTokens: MAX_TOKEN });
        console.log("\nAI: "+a);
    }

    setTimeout(async () => {

        console.clear();

        const q1 = `tell me about space`
        console.log("유저: "+q1);
        await sayToAI(q1);

        const q2 = `What were we just talking about?`
        console.log("\n유저: "+q2);
        await sayToAI(q2);

    },3000)
}

console.clear();
start();