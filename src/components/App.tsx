import {HashtagList} from "./HashtagList.tsx";
import {Footer} from "./layout/Footer.tsx";
import {Container} from "./layout/Container.tsx";
import {FeedBackItemsContext} from "../context/feedBackItemsContext.tsx";

const App = () => {

  return (
    <div className='app'>
      <Footer />
      <FeedBackItemsContext>
        <Container/>
        <HashtagList/>
      </FeedBackItemsContext>
    </div>
  )
}

export default App
