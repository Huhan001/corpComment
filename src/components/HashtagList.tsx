
//all props need ot be in one object and not separate
import {UseFeedbackContext} from "../context/feedBackItemsContext.tsx";

export const HashtagList = () => {
    const {companyList, filterComp} = UseFeedbackContext()
    return (
        <ul className='hashtags'>
            {companyList.map((data, index) =>
                <li key={index}>
                    <button onClick={() => filterComp(data)}>#{data}</button>
                </li>)}
        </ul>
    )
}

