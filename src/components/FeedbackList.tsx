import {TriangleUpIcon} from "@radix-ui/react-icons";
import {useEffect, useState} from "react";
import {feedback} from "../constant/constant.ts";
import {Spinner} from "../style/Spinner.tsx";

export const FeedbackList = () => {
    const [feedbackItems, setFeedback] = useState([]);
    const [loading, setLoading] = useState(false) //check for loading API state. include within async call.
    //    🛜 calling API
    useEffect(() => {
        const fetchFeedback = async () => {
            setLoading(true);
            try{
                const call = await fetch("https://bytegrad.com/course-assets/projects/corpcomment/api/feedbacks");
                if (!call.ok) {
                    throw new Error(`Network call failed, recieved ${call.status}`)
                }
                const response = await call.json();
                setFeedback(response.feedbacks);
                setLoading(false);
            }catch (error){
                console.log(`Error fetching feedback data: ${error}`)
            }
        }
        fetchFeedback();
    },[]);

    return (
        <ol className='feedback-list'>
            {/*learnt that i can distructure within the 👇🏾 borrowed component to meet the types*/}
            {   !loading ?
                feedbackItems.map(item => (<FeedbackItem key ={item.id} {...item} />)):
                <Spinner />
            }
        </ol>
    )
}

//☝🏾 called up there.
const FeedbackItem = ({upvoteCount, badgeLetter, company, daysAgo, text}:feedback) => {
    return (
        <>
            <li className='feedback'>
                <button>
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
                <p>{daysAgo}d</p>
            </li>
        </>
    )
}