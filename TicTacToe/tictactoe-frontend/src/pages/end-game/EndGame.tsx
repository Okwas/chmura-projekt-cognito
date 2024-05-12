import { useAppStore } from "../../stores/app-store"

export default function EndGame({text}:{text:string}) {
    const {setStage} = useAppStore()
    return (
        <div>
            <h1>{text}</h1>
            <button onClick={()=>setStage('login')}>Play again</button>
        </div>
    )
}