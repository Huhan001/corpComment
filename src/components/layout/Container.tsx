import {Header} from "./Header.tsx";
import {FeedbackList} from "../feedback/FeedbackList.tsx";


//always add the tyoe at the to

export const Container = () => {
    return (
        <main className='container'>
            <Header/>
            <FeedbackList/>
        </main>
    )
}