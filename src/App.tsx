import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import EditorContextProvider from './components/context/editorContext';
import Home from './components/Home/Home';
import Contact from './components/Contact/Contact';
import Me from './components/Me/Me';
import ResumeContextProvider from './components/context/resumeContext';


function App() {
  return (
    <Router>
      <div id='app'>
        <ResumeContextProvider>
          <EditorContextProvider>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/me" element={<Me />} />
            </Routes>
          </EditorContextProvider>
        </ResumeContextProvider>

      </div>
    </Router>
  );
}

export default App;