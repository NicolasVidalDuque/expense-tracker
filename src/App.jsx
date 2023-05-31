import { useEffect, useState } from 'react'
import Navbar from './Navbar'
import ExpenseList from './ExpenseList'
import Footer from './Footer'
import data from "./assets/data.js"
import { Months } from './assets/months'
import { currencyFormater } from './assets/currencyFormater'
import NewModal from './newModal'
import { Container } from 'react-bootstrap'
import WarningIcon from './WarningIcon'

// TODO: 
//  Create a data base, comunicate, load data, request data, edit data.

function App() {

  function handleClickShowModal(target, edit){ 
    if (edit){
      listElementEdit(target)
    }
    setModalData({'edit': edit, 'show': true})
  }

  function getElementDataIndex(targetId){
    const index = monthDataState.expenses.findIndex(element => {
      return element.id === targetId
    })
    return {'element':monthDataState.expenses[index], 'index': index}
  }

  function handleSubmitAddElement(){
    setMonthDataState(old => {return addNewExpenseElement(old)})
    handleClose()
  }

  function handleSubmitEditElement(){
    const {index, element} = getElementDataIndex(form.elementId)
    const editedElement = {
      'id': element.id,
      'date': element.date,
      'sponsored': form.sponsored,
      'title': form.title,
      'value': form.value
    }
    let newArray =[...monthDataState.expenses]
    newArray[index] = editedElement
    setMonthDataState(old => {
      return ({
        ...old,
        'expenses': newArray
      })
    })
    handleClose()
  }

  function addNewExpenseElement(old){
    // FIXME: the timezone is not the colombian time. Correct it in order to not display GMT
    const date = new Date()
    const newElement = {
          'id': crypto.randomUUID(),
          'date': date.toUTCString(),
          'sponsored': form.sponsored,
          'title': form.title,
          'value': form.value
      }
      return ({...old,
        expenses:[ newElement, ...old.expenses]
      })
  }
  
  function handleClose(){
    setForm(DEFAULT_FORM)
    setModalData(old => {return {...old, 'show': false}})
  }
  
  function handleChange(event){
    const { name, value, type, checked } = event.target
    setForm(oldData => {
      const insertValue = setInputValueFormat(name,value, oldData.value, event.nativeEvent.data);
      return ({
        ...oldData,
        [name]: type === 'checkbox' ? checked : insertValue
      });
    });
  };

  function setInputValueFormat(name, value, oldValue, eventValue){
    if (name === 'title') {return value}
    if (!Number(value)) {return oldValue}
    if (eventValue === null) {return ''}
    return Number(value)
  }

  function updateInfo(){
    setMonthDataState(previousState => {return calculateData(previousState)})
  }

  function calculateData(monthData){
    const {totalExpense, sponsoredAmount} = addExpenses(monthData.expenses)
    const amountLeft = monthData.budget - totalExpense
    return { ...monthData,
      'total': totalExpense,
      'available': amountLeft,
      'sponsoredAmount': sponsoredAmount
    }
  }

  function addExpenses(expensesArray){
    if (!expensesArray) return 0
    let totalExpense = 0
    let sponsoredAmount = 0
    expensesArray.forEach(item => {
      item.sponsored ? sponsoredAmount += item.value : totalExpense += item.value
    })
    return {totalExpense, sponsoredAmount}
  }

  function listElementDelete(event){
    const targetId = event.target.id
    setMonthDataState(old => deletionFromArray(old, targetId))
  }

  function deletionFromArray(old, targetId){ 
    return ({
      ...old,
      'expenses': old.expenses.filter((element) => {
        return (element.id !== targetId)
      })
    })
  }

  function listElementEdit(target){
    const elementObject = getElementDataIndex(target.id).element
    setForm({
      'elementId': target.id,
      'title': elementObject.title,
      'value': elementObject.value,
      'sponsored': elementObject.sponsored
    })
  }

  function setDisplayMenu(element){
    const target = element.parentElement.parentElement.parentElement.querySelector('.buttons');
    const classList = target.className.split(' ');
    let addClass;
    let removeClass;
    if(classList.includes('yes-display')){
      addClass = 'no-display';
      removeClass = 'yes-display';
    } else {
      addClass = 'yes-display';
      removeClass = 'no-display';
    }
    const index = classList.indexOf(removeClass);
    classList.splice(index);
    classList.push(addClass);
    target.className =  classList.join(' ');
  }

  // Date declaration's
  const date = new Date()
  const thisYear = date.getFullYear()
  const thisMonth = Months[date.getMonth()]
  const defaultYear = Object.keys(data)[0];
  const defaultMonth = Object.keys(data[defaultYear])[0];
  const initMonthData = (data[thisYear][thisMonth]) ? data[thisYear][thisMonth] : data[defaultYear][defaultMonth];
  
  // Modal State
  const DEFAULT_FORM = {
    'elementId': '',
    'title': '',
    'value': '',
    'sponsored': false
  }
  
  // State declaration
  const [monthDataState, setMonthDataState] = useState(initMonthData)
  const [modalData, setModalData] = useState({'show': false, 'edit': false})
  const [form, setForm] = useState(DEFAULT_FORM)
  
  useEffect(() => updateInfo(),[monthDataState.expenses])

  return (
    <div id="AppDiv" className="App" >
      <Navbar
        amountLeft={currencyFormater.format(monthDataState.available)}
        totalExpense={currencyFormater.format(monthDataState.total)}
        budget={currencyFormater.format(monthDataState.budget)}
        percentage={(monthDataState.total/monthDataState.budget)*100}
        sponsoredAmount = {currencyFormater.format(monthDataState.sponsoredAmount)}
      />

      <Container fluid className='px-0 py-3'>
        <ExpenseList 
          expenses = {monthDataState.expenses}
          listElementDelete = {listElementDelete}
          handleClickShowModal = {handleClickShowModal}
          setDisplayMenu = {setDisplayMenu}
          />
      </Container>
      
      {(monthDataState.total/monthDataState.budget > 0.9) && <WarningIcon />}
      
      <NewModal 
        handleClose = {handleClose}
        modalData = {modalData}
        handleSubmitAddElement = {handleSubmitAddElement}
        handleSubmitEditElement = {handleSubmitEditElement}
        handleChange = {handleChange}
        formData = {form}
        print = {print}
      />
      
      <Footer 
        handleClickShowModal = {handleClickShowModal}
      />
    </div>
  )
}

export default App
