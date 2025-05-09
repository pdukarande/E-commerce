// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import './App.css';
// import Navbar from './components/Navbar/Navbar';
// import Viewsingleproduct from './components/Viewsingleproduct/Viewsingleproduct';
// import Home from './components/Home/Home';
// import Cart from './components/Cart/Cart';
// import Signin from './components/Signin/Signin';

// function App() {
//   return (
//     <Router>
//       <div className="App">
//         <Navbar />
//         <Routes>
//           <Route path='/' element={<Signin/>}></Route>
//           <Route path='/home' element={<Home/>}></Route>
//           <Route path='/viewsingleproduct/:id' element={<Viewsingleproduct/>}></Route>
//           <Route path='/cart' element={<Cart/>}></Route> 
//         </Routes>
//       </div>
//     </Router>

//     // <div className="App">
//     //  <Navbar/>
//     //  <Hero/>
//     //  <Products/>
//     // </div>
//   );
// }

// export default App;


// import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
// import './App.css';
// import Navbar from './components/Navbar/Navbar';
// import Viewsingleproduct from './components/Viewsingleproduct/Viewsingleproduct';
// import Home from './components/Home/Home';
// import Cart from './components/Cart/Cart';
// import Signin from './components/Signin/Signin';

// function App() {
//   return (
//     <Router>
//       <MainLayout />
//     </Router>
//   );
// }

// function MainLayout() {
//   const location = useLocation();
//   const hideNavbarRoutes = ['/']; // Add any other routes where Navbar should be hidden

//   const shouldHideNavbar = hideNavbarRoutes.includes(location.pathname);

//   return (
//     <div className="App">
//       {!shouldHideNavbar && <Navbar />}
//       <Routes>
//         <Route path='/' element={<Signin />} />
//         <Route path='/home' element={<Home />} />
//         <Route path='/viewsingleproduct/:id' element={<Viewsingleproduct />} />
//         <Route path='/cart' element={<Cart />} />
//       </Routes>
//     </div>
//   );
// }

// export default App;


import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
// import Navbar from './components/Navbar/Navbar';
import Viewsingleproduct from './components/Viewsingleproduct/Viewsingleproduct';
import Home from './components/Home/Home';
import Cart from './components/Cart/Cart';
import Signin from './components/Signin/Signin';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <Router>
      <div className="App">
        {/* <Navbar /> */}
        <Routes>
          <Route path="/signin" element={<Signin />} />
          <Route
            path="/home"
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          />
          <Route
            path="/Viewsingleproduct/:id"
            element={
              <PrivateRoute>
                <Viewsingleproduct />
              </PrivateRoute>
            }
          />
          <Route
            path="/cart"
            element={
              <PrivateRoute>
                <Cart />
              </PrivateRoute>
            }
          />
          <Route path="*" element={<Signin />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
