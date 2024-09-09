import {useState} from "react";
import {Max_Character} from "../../constant/constant.ts";
import {UseFeedbackContext} from "../../context/feedBackItemsContext.tsx";



//you always have to do it outside. the type assrtion
export const FeedbackForm = () => {
    const [text, setTtext] = useState("");
    const [showValidindicator, setShowValidIndicator] = useState(false)
    const [showInValidindicator, setShowInValidIndicator] = useState(false)
    const {handleAddList} = UseFeedbackContext()

    const TextonClick = (event:React.ChangeEvent<HTMLTextAreaElement>) => {
        const words: string = event.target.value;

//        Guard Statment 🔥
        if (words.length > Max_Character) {
//            causes the function to prematurely end here
            return
        }
        setTtext(words)
    }


    const onFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        text.includes('#') ? setShowValidIndicator(true) : setShowValidIndicator(false);
        !text.includes('#') ? setShowInValidIndicator(true): setShowInValidIndicator(false);          
        
        text.includes('#') && setTtext("");
    }
//use onsubmit to offset the behaviour of forms
    return (
        <form onSubmit={onFormSubmit} className={`form ${showValidindicator? 'form--valid':''} ${showInValidindicator? 'form--invalid' : ''}`}>
            <textarea onChange={TextonClick} value={text} id = 'feedback-textarea' placeholder='what is it?' spellCheck={true}/>

            <label htmlFor='feedback-textarea'>
                Enter your feedback here, remember to #hastag the company
            </label>

            <div>
                <p className='u-italic'>{Max_Character - text.length}</p>
                <button onClick={() => handleAddList(text)}>
                    <span>Submit</span>
                </button>
            </div>
        </form>
    )
}