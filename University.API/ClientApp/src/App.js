import React, { useState } from 'react';
import Hero from './components/Hero';
import Navbar from './components/Navbar';
import { SliderData } from './data/SliderData';
import GlobalStyle from './globalStyles';
import Dropdown from './components/Dropdown'
import InfoSection from './components/InfoSection'
import { InfoData } from './data/InfoData';
import TableSection from './components/TableSection';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Page from './components/Page';
import { Button } from './components/Button'
import styled from 'styled-components'
import { RiArrowUpSLine } from 'react-icons/ri'

const Arrow = styled(RiArrowUpSLine)``

export const QuickViewButton = styled(Button)`
margin:auto;
`

const QuickView = styled.div`
position:fixed;
width:100vw;
bottom:0;
z-index:999;
transform: translateY(calc(100% - 50px));
/* transform: translateY(0%); */
transition: all 1s ease;

:hover{
  transform: translateY(0%);
}
`

function App() {
  const [dropdownIsOpen, setDropdownIsOpen] = useState(false);
  const [activeNavBar, setActiveNavBar] = useState(true);

  const showDropdown = () => {
    setDropdownIsOpen(true)
  }

  const hideDropdown = () => {
    setDropdownIsOpen(false)
  }

  const MainPage = () => {
    return <React.Fragment>
      <Hero slides={SliderData} />
      <InfoSection {...InfoData} />
      <QuickView>
        <QuickViewButton>
          <Arrow size={24} />
        </QuickViewButton>
        <TableSection showFeaturesCount={5} />
      </QuickView>
    </React.Fragment>
  }

  const text = 'Aliquip laborum fugiat velit sunt ad in proident excepteur proident excepteur veniam reprehenderit nisi dolor. Incididunt cupidatat consectetur id veniam nulla ad Lorem. Cillum et laborum enim adipisicing ex aute nulla incididunt eu eiusmod. Ut quis non irure officia incididunt.'

  const PeoplePage = () => {
    return <React.Fragment>
      <Page
        entity="People"
        header={"People"}
        desctiption={text} />
    </React.Fragment>
  }
  const StudentsPage = () => {
    return <React.Fragment>
      <Page
        entity="Students"
        header={"Students"}
        desctiption={text} />
    </React.Fragment>
  }
  const TeachersPage = () => {
    return <React.Fragment>
      <Page
        entity="Teachers"
        header={"Teachers"}
        desctiption={text} />
    </React.Fragment>
  }
  const SubjectsPage = () => {
    return <React.Fragment>
      <Page
        entity="Subjects"
        header={"Subjects"}
        desctiption={text} />
    </React.Fragment>
  }

  return (
    <BrowserRouter>
      <GlobalStyle />
      <Navbar active={activeNavBar} toggle={showDropdown} />
      <Dropdown isOpen={dropdownIsOpen} toggle={hideDropdown} />
      <Switch>
        <Route path="/people">
          <PeoplePage></PeoplePage>
        </Route>
        <Route path="/students">
          <StudentsPage></StudentsPage>
        </Route>
        <Route path="/teachers">
          <TeachersPage></TeachersPage>
        </Route>
        <Route path="/subjects">
          <SubjectsPage></SubjectsPage>
        </Route>
        <Route path="/">
          <Dropdown isOpen={dropdownIsOpen} toggle={hideDropdown} />
          <MainPage></MainPage>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;

  // const [scrollY, setScrollY] = useState(0);

// const toggleEditForm = (e, id, entity) => {
  //   e.preventDefault();
  //   setEditFormIsOpen(!editFormIsOpen)

  //   if (editFormIsOpen && entity) {
  //     setAddFormIsOpen(false)

  //     axios.get(`https://localhost:44379/${entity.toLowerCase()}/get-by-id/${id}`)
  //       .then(res => res.data)
  //       .then(data => setEditFormData(data))
  //   }
  // }

  // const toggleAddForm = (e, entity) => {
  //   e.preventDefault();
  //   setAddFormIsOpen(!addFormIsOpen)

  //   if (addFormIsOpen && entity) {
  //     setEditFormIsOpen(false)

  //     let properties = TabsData[entity].properties;
  //     let keys = Object.keys(properties);
  //     let data = {};

  //     keys.map(key => data[key] = properties[key].type === "text" ? "" : 0)

  //     setAddFormData(data)
  //   }
  // }

  // <GlobalStyle />
  //       <Navbar active={activeNavBar} toggle={toggle} isOpen={isOpen} />
  //       <Dropdown isOpen={isOpen} toggle={toggle} />

  //       <Hero slides={SliderData} />
  //       <InfoSection {...InfoData} />
  //     <TableSection tabsData={TabsData} />
  //     <TableSection tabsData={TabsData} />


   // const memoizedCallback = useCallback(
  //   () => {
  //     if (window.scrollY >= 775 && activeNavBar === false) {
  //       setActiveNavBar(true)
  //     } else if (window.scrollY < 775 && activeNavBar === true) {
  //       setActiveNavBar(false)
  //     }
  //   },
  //   [window.scrollY],
  // )

  // let scroll = window.scrollY;

  // useEffect(() => {
  //   document.addEventListener("scroll", e => {
  //     let scrolled = window.scrollY;
  //     const targetY = 500
  //     if (scrolled >= targetY && activeNavBar === false) {
  //       setActiveNavBar(true)

  //     } else if (scrolled < targetY && activeNavBar === true) {
  //       setActiveNavBar(false)

  //     }
  //   })
  // }, [])

  // useEffect(() => {
  //   if (scrollY >= 775 && activeNavBar === false) {
  //     setActiveNavBar(true)
  //   } else if (scrollY < 775 && activeNavBar === true) {
  //     setActiveNavBar(false)
  //   }
  // }, [scrollY])
