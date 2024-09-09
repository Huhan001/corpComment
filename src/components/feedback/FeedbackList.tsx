import {TriangleUpIcon} from "@radix-ui/react-icons";
import {ErrorMesage} from "../ErrorMesage.tsx";
import {feedback} from "../../constant/constant.ts";
import {Spinner} from "../../style/Spinner.tsx";
import {useState} from "react";
import {UseFeedbackContext} from "../../context/feedBackItemsContext.tsx";


export const FeedbackList = () => {
    const {errorMesage, loading, filteredByCompany} = UseFeedbackContext()
    return (
        <ol className='feedback-list'>
            {errorMesage.length > 0 ? <ErrorMesage mesage={errorMesage} /> : null}
            {/*learnt that i can distructure within the 👇🏾 borrowed component to meet the types*/}
            {   !loading ?
                filteredByCompany.map(item => (<FeedbackItem key ={item.id} {...item} />)):
                <Spinner />
            }
        </ol>
    )
}

//☝🏾 called up there.
const FeedbackItem = ({id, upvoteCount, badgeLetter, company, daysAgo, text}:feedback) => {
    const {UpvoteAdd} = UseFeedbackContext()
    const [open, setOpen] = useState(false)
    return (
        <>
            <li  onClick={() => setOpen(prev => !prev)} className={`feedback ${open ? "feedback--expand" : ""}`}>
                <button onClick={(event) => UpvoteAdd(id, event)} >
                    <TriangleUpIcon />
                    <span>{upvoteCount}</span>
                </button>
                <div>
                    <p>{badgeLetter}</p>
                </div>

                <div>
                    <p>{company}</p>
                    <p>{text}</p>
                </div>
                <p>{daysAgo === 0? 'NEW' : `${daysAgo}`}</p>
            </li>
        </>
    )
}