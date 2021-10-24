
import './index.css';
import Main from './components/Main';
import Header from './components/Header';
import Footer from './components/Footer';
function App() {
    return (
        <div className="antialiased  font-notosansmono h-screen flex flex-col">
            <Header />
            <Main />
            <Footer />
        </div>
    );
}

export default App;