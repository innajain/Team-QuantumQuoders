import { useContext } from "react";
import { QuizContext } from "../../utils/QuizContext";
export function TopBar() {
    const {currentQuestionIndex, questions} = useContext(QuizContext);
    const totalQuestions = questions.length;
    return (
        <>
            <div className="w-[100%] h-6 bg-[#298787] absolute top-0 left-0"></div>
            <div
                style={{
                    width: ((1 / totalQuestions) * 100).toFixed(3).toString() + "%",
                    height: "24px",
                    backgroundColor: "#205D76",
                    position: "absolute",
                    top: "0px",
                    left: ((currentQuestionIndex / totalQuestions) * 100)
                        .toFixed(3)
                        .toString() + "%",
                }}
            ></div>
        </>
    );
}
