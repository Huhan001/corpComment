export const FeedbackForm = () => {
    return (
        <form className='form'>
            <textarea id = 'feedback-textarea' placeholder='what is it?' spellCheck={false}/>

            <label htmlFor='feedback-textarea'>
                Enter your feedback here, remember to #hastag the company
            </label>

            <div>
                <p className='u-italic'>150</p>
                <button>
                    <span>Submit</span>
                </button>
            </div>
        </form>
    )
}