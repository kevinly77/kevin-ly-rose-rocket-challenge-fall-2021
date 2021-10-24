import axios from 'axios';
import React, { Component } from 'react';


import { Draggable } from 'react-beautiful-dnd';
import CurrencyFormat from 'react-currency-format';
class OrderCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isEditing: false,
            cost: this.props.order.cost,
            revenue: this.props.order.revenue,
            cardToggle: false,
        }
        this.handleRevenueChange = this.handleRevenueChange.bind(this);
        this.handleCostChange = this.handleCostChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleToggleCardInfoOn = this.handleToggleCardInfoOn.bind(this);
        this.handleToggleCardInfoOff = this.handleToggleCardInfoOff.bind(this);
    }

    handleRevenueChange(event) {
        let revenue = this.props.order.revenue;
        console.log(event.target.value);
        if (event.target.value !== '') {
            revenue = event.target.value;
            console.log(revenue);
            this.setState({ revenue: revenue });
        }
        //console.log(revenue);
        //const revenue = event.target.value;
        //this.setState({ revenue: revenue });
    }

    handleCostChange(event) {
        let cost = this.props.order.cost;
        console.log(event.target.value);
        if (event.target.value !== '') {
            cost = event.target.value;
            console.log(cost);
            this.setState({ cost: cost });
        }
    }

    handleSubmit(event) {



        try {
            const cost = parseInt(this.state.cost);
            const revenue = parseInt(this.state.revenue);

            const payload = {
                cost: cost,
                revenue: revenue,
                orderId: this.props.order.id
            }
            axios.post('/saveCostAndRevenue', payload)
                .then((response) => {
                    console.log(response.data.orders);
                    this.props.parentCallBack(response.data.orders);
                },
                    (error) => {
                        console.log(error)
                    })
            this.setState({ isEditing: false });

        } catch (error) {
            console.log(error);
        }

    }

    handleEditClick = (event) => {
        this.setState({ isEditing: true });
    }

    handleSaveClick = (event) => {
        console.log(event.target.value);

        this.setState({ isEditing: false });
    }

    handleDeleteOrderClick = (event) => {
        alert("Deleting card is a work in progress")
    }

    handleToggleCardInfoOn() {
        this.setState({
            cardToggle: true,
        })
    }

    handleToggleCardInfoOff() {
        this.setState({
            cardToggle: false,
        })
    }
    render() {
        return (
            <div className="flex justify-center">
                <Draggable draggableId={this.props.order.id} index={this.props.index}>
                    {(provided, snapshot) => (
                        <div
                            className="bg-white rounded-md shadow-md border border-gray-200 w-11/12 my-2"
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            ref={provided.innerRef}
                            isDragging={snapshot.isDragging}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" onClick={this.handleDeleteOrderClick} className="h-5 w-5 ml-auto mt-2 mr-4 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="red">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                            <div className="shadow-md border-b-1 border-gray-200 p-4 grid grid-cols-12 h-auto">
                                <div className="col-span-6 flex">
                                    <p className="font-bold text-2xl">{this.props.order.id}</p>

                                </div>
                                <div className="text-lg font-medium text-gray-700 flex flex-row gap-1 col-start-1 col-span-12 ">
                                    <p>{this.props.order.source}</p>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                    </svg>
                                    <p>{this.props.order.destination}</p>
                                </div>

                                {this.state.isEditing ? (

                                    <div className="font-semibold flex flex-col col-start-1 col-span-12">
                                        <form id="cost-revenue-form" onSubmit={this.handleSubmit}>
                                            <input type="number" min={0} className="border-2  mx-2 my-1" defaultValue={this.props.order.cost} name="cost" onChange={this.handleCostChange}></input>
                                            <input type="number" min={0} className="border-2  mx-2 my-1" defaultValue={this.props.order.revenue} name="revenue" onChange={this.handleRevenueChange}></input>

                                        </form>
                                        <button form="cost-revenue-form" className="ml-auto" type="submit">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 col-start-6 ml-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
                                            </svg>
                                        </button>

                                    </div>
                                ) : (
                                    <div className="font-semibold col-start-1 col-span-12 ">

                                        <table className="">
                                            <tr>
                                                <td><p className="text-gray-600 font-normal">Cost:</p></td>
                                                <td className="pl-1"><CurrencyFormat className="text-red-600 font-normal" value={this.props.order.cost} displayType={'text'} thousandSeparator={true} prefix={'$'} /></td>

                                            </tr>

                                            <tr>
                                                <td><p className="text-gray-600 font-normal">Revenue: </p></td>
                                                <td className="pl-1"><CurrencyFormat className="text-green-600 font-normal" value={this.props.order.revenue} displayType={'text'} thousandSeparator={true} prefix={'$'} /></td>
                                            </tr>
                                        </table>
                                        <svg onClick={this.handleEditClick} xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 ml-auto cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                        </svg>



                                    </div>


                                )}

                                {this.state.cardToggle ? (
                                    <div className="col-span-12 animate-fade-in-down">

                                        <div className="py-5 flex flex-col justify-between text-gray-600">
                                            <table>
                                                <tr>
                                                    <td>
                                                        <h1>Content:</h1>

                                                    </td>
                                                    <td className="ml-auto">
                                                        <h1>{this.props.order.content}</h1>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <h1>Shipper:</h1>
                                                    </td>
                                                    <td>
                                                        <h1>{this.props.order.shipper}</h1>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <h1>Receiver:</h1>
                                                    </td>
                                                    <td>
                                                        {this.props.order.receiver}
                                                    </td>
                                                </tr>
                                            </table>
                                        </div>
                                        <div className=" cursor-pointer flex justify-center">
                                            <svg xmlns="http://www.w3.org/2000/svg" onClick={this.handleToggleCardInfoOff} className="h-6 w-6 " fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 11l7-7 7 7M5 19l7-7 7 7" />
                                            </svg>
                                        </div>


                                    </div>

                                ) : (
                                    <div className="col-span-12 animate-fade-in-up">
                                        <svg xmlns="http://www.w3.org/2000/svg" onClick={this.handleToggleCardInfoOn} className="h-6 w-6 mx-auto cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 13l-7 7-7-7m14-8l-7 7-7-7" />
                                        </svg>
                                    </div>

                                )}
                            </div>


                        </div>
                    )
                    }

                </Draggable>
            </div >


        );
    }
}

export default OrderCard;