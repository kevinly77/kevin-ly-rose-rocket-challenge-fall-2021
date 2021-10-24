import React, { Component } from 'react';
import Column from './Column';
import '../index.css';
import { DragDropContext } from 'react-beautiful-dnd';

const axios = require('axios');



class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            columnOrder: [],
            columns: [],
            drivers: [],
            orders: [],
        }
        this.callMeBack = this.callMeBack.bind(this);
        this.handleAddDriverClick = this.handleAddDriverClick.bind(this);
        this.handleDriverSaveClick = this.handleDriverSaveClick.bind(this);
        this.handleAddOrderClick = this.handleAddOrderClick.bind(this);
        this.handleSaveOrderClick = this.handleSaveOrderClick.bind(this);
        this.handleOrderFormInputChange = this.handleOrderFormInputChange.bind(this);
        this.handleNewOrderSubmit = this.handleNewOrderSubmit.bind(this);
        this.handleDriverFormInputChange = this.handleDriverFormInputChange.bind(this);
        this.handleNewDriverSubmit = this.handleNewDriverSubmit.bind(this);
    }


    callMeBack = (childData) => {
        console.log(childData);
        this.setState({ orders: childData });
    }

    onDragEnd = result => {
        const { destination, source, draggableId } = result;


        // checking to see if user drags content outside of specified droppable zone
        if (!destination) {
            return;
        }
        // checking to see if item is dropped back into the same place
        if (
            destination.droppableId === source.droppableId &&
            destination.index === source.index
        ) {
            return;
        }

        const start = this.state.columns[source.droppableId];
        const finish = this.state.columns[destination.droppableId];

        //start === finish if we are moving items in the same column
        if (start === finish) {
            const column = this.state.columns[source.droppableId];
            const newOrderIds = Array.from(column.orderIds);

            //remove source item from orderIds and splice into destination
            newOrderIds.splice(source.index, 1);
            newOrderIds.splice(destination.index, 0, draggableId)


            //creating a new column object with the same properties except for new orderIds
            const newColumn = {
                ...column,
                orderIds: newOrderIds,
            };
            console.log(newColumn);
            const columnOrderCopy = this.state.columnOrder
            const newState = {
                //bug: will save columnOrder with indexes to backend if trying to ...spread
                columnOrder: [] = columnOrderCopy,
                columns: {
                    ...this.state.columns,
                    [newColumn.id]: newColumn,
                },
                drivers: {
                    ...this.state.drivers
                },
                orders: {
                    ...this.state.orders
                },

            }
            console.log(newState);
            this.setState(newState);
            this.saveToBackEnd(newState);
        } else {
            //Moving orders from one list to another
            const startOrderIds = Array.from(start.orderIds);
            startOrderIds.splice(source.index, 1);
            const newStart = {
                ...start,
                orderIds: startOrderIds,
            };

            const finishTaskIds = Array.from(finish.orderIds);
            finishTaskIds.splice(destination.index, 0, draggableId);
            const newFinish = {
                ...finish,
                orderIds: finishTaskIds,
            };
            const columnOrderCopy = this.state.columnOrder
            const newState = {
                //bug: will save columnOrder with indexs to backend if trying to ...spread
                columnOrder: [] = columnOrderCopy,
                columns: {
                    ...this.state.columns,
                    [newStart.id]: newStart,
                    [newFinish.id]: newFinish,
                },
                drivers: {
                    ...this.state.drivers
                },
                orders: {
                    ...this.state.orders
                },
            };
            this.setState(newState);
            this.saveToBackEnd(newState);
        }
    };

    saveToBackEnd(payload) {
        axios.post('/updateJSON', payload)
            .then((response) => {
                console.log(response);
            },
                (error) => {
                    console.log(error)
                })
    }


    getBackEndData() {
        axios.get('/getData')
            .then((response) => {
                const data = response.data;
                this.setState(data);
            })
    }


    componentDidMount() {
        this.getBackEndData();
    }

    handleJSONDownloadClick() {
        axios({
            url: '/downloadJSON',
            method: 'GET',
            responseType: 'blob',
        }).then((response) => {
            console.log(response.data);
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'data.json');
            document.body.appendChild(link);
            link.click();
        });
    }

    handleJSONUpload(event) {
        const formData = new FormData();
        const file = event.target.files[0];
        formData.append('file', file);

        axios.post('/uploadJSON', file)
            .then((response) => {
                console.log(response);
            })
    }

    handleAddDriverClick(event) {
        event.preventDefault();
        this.setState({ isAddingDriver: true });
    }

    handleDriverSaveClick(event) {
        event.preventDefault();
        this.setState({ isAddingDriver: false })
    }

    handleAddOrderClick(event) {
        event.preventDefault();
        this.setState({ isAddingOrder: true })
    }

    handleSaveOrderClick(event) {
        event.preventDefault();
        this.setState({ isAddingOrder: false })
    }

    handleNewOrderSubmit(event) {
        event.preventDefault();
        const newOrder = this.state.newOrder;
        const payload = {
            id: '',
            content: newOrder.content,
            source: newOrder.source,
            destination: newOrder.destination,
            revenue: parseFloat(newOrder.revenue),
            cost: parseFloat(newOrder.cost),
            shipper: newOrder.shipper,
            receiver: newOrder.receiver
        }

        axios.post('/saveNewOrder', payload)
            .then((response) => {
                this.setState(response.data);
            },
                (error) => {
                    console.log(error)
                })
        this.setState({
            isAddingOrder: false,
            newDriver: {},
        });
    }

    handleNewDriverSubmit(event) {
        event.preventDefault();
        const newDriver = this.state.newDriver;
        axios.post('/saveNewDriver', newDriver)
            .then((response) => {
                this.setState(response.data);
            },
                (error) => {
                    console.log(error)
                })
        this.setState({
            isAddingDriver: false,
            newDriver: {}
        })
    }

    handleOrderFormInputChange(event) {
        event.preventDefault();
        const target = event.target;
        console.log(target.value);
        this.setState({
            newOrder: {
                ...this.state.newOrder,
                [target.name]: target.value
            }
        })
    }

    handleDriverFormInputChange(event) {
        event.preventDefault();
        const target = event.target;
        console.log(target.value);
        this.setState({
            newDriver: {
                ...this.state.newDriver,
                [target.name]: target.value
            }
        })
        console.log(this.state);
    }
    render() {
        return (
            <div>
                <div className="flex justify-center p-4 gap-4 mt-7">
                    <div>
                        <button className='bg-blue-800 hover:bg-blue-700 text-white py-2 px-4 rounded ' onClick={this.handleJSONDownloadClick}>Download Data</button>
                    </div>
                    {this.state.isAddingOrder ?
                        (<div className="">

                            <div className="items-center justify-center flex flex-col overflow-x-hidden overflow-y-auto fixed inset-0 z-50 animate-fade-in-down">
                                <div className=" rounded-lg bg-white flex flex-col justify-center p-4 text-lg">
                                    <svg xmlns="http://www.w3.org/2000/svg" onClick={this.handleSaveOrderClick} className="h-5 w-5 ml-auto cursor-pointer" viewBox="0 0 20 20" fill="red">
                                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                    </svg>
                                    <form id="addNewOrderForm" className="flex flex-col justify-evenly gap-2" onSubmit={this.handleNewOrderSubmit}>
                                        <label className="flex flex-col">
                                            Content:
                                            <input className="border" required type="text" onChange={this.handleOrderFormInputChange} name="content"></input>
                                        </label>
                                        <label className="flex flex-col">
                                            Source:
                                            <input className="border" required type="text" onChange={this.handleOrderFormInputChange} name="source"></input>
                                        </label>
                                        <label className="flex flex-col">
                                            Destination:
                                            <input className="border" required type="text" onChange={this.handleOrderFormInputChange} name="destination"></input>
                                        </label>
                                        <label className="flex flex-col">
                                            Cost:
                                            <input className="border" min={0} required type="number" onChange={this.handleOrderFormInputChange} name="cost"></input>
                                        </label>
                                        <label className="flex flex-col">
                                            Revenue:
                                            <input className="border" min={0} required type="number" onChange={this.handleOrderFormInputChange} name="revenue"></input>
                                        </label>
                                        <label className="flex flex-col">
                                            Shipper:
                                            <input className="border"  required type="text" onChange={this.handleOrderFormInputChange} name="shipper"></input>
                                        </label>
                                        <label className="flex flex-col">
                                            Receiver:
                                            <input className="border"  required type="text" onChange={this.handleOrderFormInputChange} name="receiver"></input>
                                        </label>
                                    </form>
                                    <button className='bg-blue-800 hover:bg-blue-700 text-white  py-2 px-4 mt-4 rounded' form="addNewOrderForm" type="submit">Save Order</button>
                                </div>
                            </div>
                            <div className="opacity-50 fixed inset-0 z-40 bg-black"></div>
                            <button className='bg-blue-800 hover:bg-blue-700 text-white py-2 px-4 rounded' onClick={this.handleAddOrderClick}>Add Order</button>
                        </div>)
                        :
                        (<div>
                            <button className='bg-blue-800 hover:bg-blue-700 text-white py-2 px-4 rounded' onClick={this.handleAddOrderClick}>Add Order</button>
                        </div>)

                    }

                    {this.state.isAddingDriver ?
                        (<div className="">
                            <div className="items-center justify-center flex flex-col overflow-x-hidden overflow-y-auto fixed inset-0 z-50 animate-fade-in-down">
                                <div className="rounded-lg bg-white flex flex-col justify-center p-4">
                                    <svg xmlns="http://www.w3.org/2000/svg" onClick={this.handleDriverSaveClick} className="h-5 w-5 ml-auto cursor-pointer" viewBox="0 0 20 20" fill="red">
                                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                    </svg>
                                    <div className=" rounded-lg flex flex-col gap-2">
                                        <form id="addNewDriverForm" className="flex flex-col justify-center text-lg" onSubmit={this.handleNewDriverSubmit}>
                                            <label className="">
                                                Name:
                                            </label>
                                            <input className="border" required onChange={this.handleDriverFormInputChange} name="name" ></input>
                                            <label className="">
                                                Insurance:
                                            </label>
                                            <div>
                                                <input className="border" min={0} required type="number" onChange={this.handleDriverFormInputChange} name="insurance"></input>
                                            </div>
                                        </form>
                                        <button className='bg-blue-800 hover:bg-blue-700 text-white py-2 px-4 rounded' type="submit" form="addNewDriverForm">Save Driver</button>
                                    </div>
                                </div>

                            </div>
                            <div className="opacity-50 fixed inset-0 z-40 bg-black"></div>
                            <button className='bg-blue-800 hover:bg-blue-700 text-white py-2 px-4 rounded' onClick={this.handleAddDriverClick}>Add Driver</button>
                        </div>)
                        :
                        (<div>
                            <button className='bg-blue-800 hover:bg-blue-700 text-white py-2 px-4 rounded' onClick={this.handleAddDriverClick}>Add Driver</button>
                        </div>)

                    }


                </div>

                <div className="py-10 flex flex-row gap-8 w-11/12 mx-auto flex-grow ">

                    <DragDropContext onDragEnd={this.onDragEnd}>
                        <div className="gap-2 sm:w6/12 w-3/12 mx-2 border-2 rounded-lg border-blue-800">
                            <div className="border-b-2 border-blue-800 bg-blue-800 text-white">
                                <h1 className="text-3xl text-center">Unassigned</h1>
                            </div>
                            <div className="px-3 mt-16">
                                {this.state.columnOrder.map((columnId) => {
                                    if (columnId === 'column-1') {
                                        const column = this.state.columns[columnId];
                                        const orders = column.orderIds.map((orderId) => this.state.orders[orderId]);
                                        return <Column key={column.id} orderList={this.state.orders} column={column} orders={orders} title={column.title} parentCallBack={this.callMeBack} isFirstColumn={true} />
                                    }


                                })}
                            </div>


                        </div>
                        <div className="mx-3 sm:w6/12 w-9/12 border-2  border-blue-800 rounded-lg">
                            <div className="border-b-2 border-blue-800 bg-blue-800 text-white">
                                <h1 className="text-3xl text-center">Drivers</h1>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 px-8 my-14">

                                {this.state.columnOrder.map((columnId) => {

                                    if (columnId !== 'column-1') {
                                        const column = this.state.columns[columnId];
                                        const driver = this.state.drivers[column.driverId];
                                        console.log(driver);
                                        const orders = column.orderIds.map((orderId) => this.state.orders[orderId])
                                        return <Column key={column.id} driver={driver} orderList={this.state.orders} column={column} orders={orders} title={column.title} parentCallBack={this.callMeBack} isFirstColumn={false} />
                                    }
                                    return null;
                                })}

                            </div>

                        </div>
                    </DragDropContext>
                </div>

            </div >

        );
    }
}

export default Main;