import FirebaseImgUpload from "./components/FirebaseImgUpload";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Ckeditor from "./components/Ckeditor";

function App() {


  return (
    <Router>
      <Switch>
        <Route exact path={"/"} component={FirebaseImgUpload} />
        <Route exact path={"/ckeditor"} component={Ckeditor} />
      </Switch>
    </Router>
  );
}

export default App;
