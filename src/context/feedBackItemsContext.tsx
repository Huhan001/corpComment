import {createContext, useContext, useEffect, useMemo, useState} from "react";
import {feedback} from "../constant/constant.js";

type TFeedbackContext = {
    feedbackItems: feedback[],
    loading: boolean,
    errorMesage: string,
    companyList: (string | undefined)[],
    handleAddList: (text:string) => void,
    UpvoteAdd:(id: number, event:React.MouseEvent<HTMLButtonElement,MouseEvent>) => void,
    filterComp: (word:string) => void,
    filteredByCompany: feedback[],
}
type TfeedbackItemContextProp = {children: React.ReactNode}
const FeedbackContextProvider = createContext<TFeedbackContext | null>(null);

export const FeedBackItemsContext = ({children}: TfeedbackItemContextProp) => {
    const [feedbackItems, setFeedback] = useState<feedback[]>([]);
    const [loading, setLoading] = useState(false) //check for loading API state. include within async call.
    const [errorMesage, setErrorMessage] = useState('');
    const [comp, setcomp] = useState('')


    //usememo saves the perfomance and we would only run this once when anythin changes within.
    const filteredByCompany = useMemo(() => { return comp ?
        feedbackItems.filter(data => data.company === comp): feedbackItems},[feedbackItems, comp]);
    
    const companyList = useMemo(() => {return feedbackItems.map(data => data.company).filter((company, index, array) => array.indexOf(company) === index)},[feedbackItems])
    
    const handleAddList = async (text:string) => {
        const newItem: feedback = {
            text: text,
            upvoteCount: 0,
            daysAgo: 0,
            company: text.split(/\s/).find(word => word.includes('#'))!.substring(1),
            badgeLetter: text.split(/\s/).find(word => word.includes('#'))!.substring(1,2).toUpperCase(),
            id: new Date().getMilliseconds()
        }

        setFeedback([...feedbackItems, newItem]); //setting data locally

//        setting on web 🛜
        await fetch("https://bytegrad.com/course-assets/projects/corpcomment/api/feedbacks", {
            method: 'POST',
            body: JSON.stringify(newItem),
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }
        })
    }
    const filterComp = (word: string) => {feedbackItems.some(data => data.company === word) && setcomp(word)}
    
    useEffect(() => {
        const fetchFeedback = async () => {
            setLoading(true);
            try{
                const call = await fetch("https://bytegrad.com/course-assets/projects/corpcomment/api/feedbacks");
                if (!call.ok) {
                    throw new Error('Could run ${call.status}')
                }
                const response = await call.json();
                setFeedback(response.feedbacks);
                setLoading(false);
            }catch (error){
                setErrorMessage(`Error fetching feedback data: ${error}`)
                setLoading(false)
            }
        }
        fetchFeedback();
    },[]);
    
    const UpvoteAdd = (id: number, event:React.MouseEvent<HTMLButtonElement,MouseEvent>) => {
        event.stopPropagation();
        event.currentTarget.disabled = true;
        setFeedback(feedbackItems.map(data => data.id === id ? {...data, upvoteCount: data.upvoteCount + 1} : data))
    }
    
    return (
        <FeedbackContextProvider.Provider 
            value={{
                feedbackItems,
                UpvoteAdd,
                loading,
                handleAddList,
                errorMesage,
                companyList,
                filterComp,
                filteredByCompany
            }}> {children} </FeedbackContextProvider.Provider>
    )
}

export const UseFeedbackContext = () => {
    const context = useContext(FeedbackContextProvider);
    
    if(!context) {
        throw new Error("couldnt find context");
    }
    
    return context
}
