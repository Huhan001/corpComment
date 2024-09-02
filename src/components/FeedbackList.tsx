import {TriangleUpIcon} from "@radix-ui/react-icons";

export const FeedbackList = () => {
    return (
        <ol className='feedback-list'>
            <li className='feedback'>
                <button>
                    <TriangleUpIcon />
                    <span>153</span>
                </button>
                <div>
                    <p>H</p>
                </div>

                <div>
                    <p>Hanson</p>
                    <p>At GPT Lab, your privacy is our top priority.To protect your personal information, our system only uses the hashed value complete privacy and anonymity.sdsdsdsdsour privacy is our top priorit
                    </p>
                </div>
                <p>4d</p>
            </li>
        </ol>
    )
}