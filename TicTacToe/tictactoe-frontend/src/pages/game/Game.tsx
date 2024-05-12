import { useGameStore } from "../../stores/game-store"

export default function Game() {
    const {symbol, turn, gamestate, username, performMove} = useGameStore()
    const rows = 3
    const cols = 3

    const handleMove = (index: number) => {
        const newGamestate = gamestate.split('')
        newGamestate[index] = symbol
        performMove({newGamestate: newGamestate.join('')})
    }

    return (
        <div>
            <h1>Game</h1>
            <h2>{`You are: ${symbol}`}</h2>
            <h2>{`Turn: ${turn}`}</h2>
            <h2>{`Gamestate: ${gamestate}`}</h2>
            <h2>{`Username: ${username}`}</h2>
            <div>
                {[...Array(rows)].map((_, i) => (
                    <div key={i}>
                        {[...Array(cols)].map((_, j) => (
                            <button key={j} onClick={() => handleMove(i * cols + j)}>
                                {gamestate[i * cols + j]}
                            </button>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    )
}