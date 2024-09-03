import {useState} from "react";
import {Max_Character} from "../constant/constant.ts";

export const FeedbackForm = () => {
    const [text, setTtext] = useState("");

    const TextonClick = (event:React.ChangeEvent<HTMLTextAreaElement>) => {
        const words: string = event.target.value;

//        Guard Statment 🔥
        const wordcount: number = WordCount(words)
        if (wordcount > Max_Character) {
//            causes the function to prematurely end here
            return
        }
        setTtext(words)
    }

    const WordCount = (texts: string): number => {
        return  texts.split(/\s/).filter((word: string) => word !== "").length;
    }

    const totals: number = WordCount(text)

    return (
        <form className='form'>
            <textarea onChange={TextonClick} value={text} id = 'feedback-textarea' placeholder='what is it?' spellCheck={false}/>

            <label htmlFor='feedback-textarea'>
                Enter your feedback here, remember to #hastag the company
            </label>

            <div>
                <p className='u-italic'>{Max_Character - totals}</p>
                <button>
                    <span>Submit</span>
                </button>
            </div>
        </form>
    )
}