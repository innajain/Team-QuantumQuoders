import { useContext } from "react";
import { QuizContext } from "../../utils/QuizContext";

export function ClearButton({
    handleClear,
}: {
    handleClear: () => void;

}) {
    const {quizState} = useContext(QuizContext)!;
    return (
        <>
            {quizState == "started" ? (
                <button
                    className="absolute -bottom-20 left-[50%] -translate-x-[50%] px-5 py-2 
        bg-red-600 hover:bg-red-700 active:bg-red-800 text-white"
                    onClick={handleClear}
                >
                    Clear
                </button>
            ) : (
                <></>
            )}
        </>
    );
}
