import React, { Component } from 'react';
import OrderCard from './OrderCard';


import CurrencyFormat from 'react-currency-format';
import { Droppable } from 'react-beautiful-dnd';
class Column extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
        this.calculateTotalDriverCost = this.calculateTotalDriverCost.bind(this);
    }

    calculateTotalDriverCost() {
        let totalDriverCost = 0;
        this.props.column.orderIds.forEach((orderId) => {
            totalDriverCost += this.props.orderList[orderId].cost;
        })
        return totalDriverCost;
    }

    calculateTotalDriverRevenue() {
        let totalDriverRevenue = 0;
        this.props.column.orderIds.forEach((orderId, index) => {
            totalDriverRevenue += this.props.orderList[orderId].revenue;
        })
        return totalDriverRevenue;
    }

    render() {
        return (
            <div className='rounded-lg border  border-gray-400  bg-white my-2'>
                {this.props.isFirstColumn ? (
                    <div>
                        <h1 className="py-1 shadow-md text-2xl text-center bg-blue-800 text-white rounded-t-lg">Orders</h1>
                    </div>
                ) : (
                    <div>
                        <h1 className="py-1 shadow-md text-2xl text-center bg-blue-800 text-white rounded-t-lg">{this.props.driver.name}</h1>
                        {this.props.column.orderIds.length === 0 ? (<div></div>) : (<table className="m-4">
                            <tr>
                                <td>
                                    <h1>Total Cost:</h1>
                                </td>
                                <td>
                                    <CurrencyFormat className="text-red-600" value={this.calculateTotalDriverCost()} displayType={'text'} thousandSeparator={true} prefix={'$'} />
                                </td>
                            </tr >
                            <tr>
                                <td>
                                    <h1>Total Revenue:</h1>
                                </td>
                                <td>
                                    <CurrencyFormat className="text-green-600" value={this.calculateTotalDriverRevenue()} displayType={'text'} thousandSeparator={true} prefix={'$'} />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <h1>Order Amount:</h1>
                                </td>
                                <td>
                                    <h1>{this.props.column.orderIds.length}</h1>
                                </td>
                            </tr>
                        </table >)
                        }
                    </div>
                )
                }
                <div className="rounded-lg mx-5 my-4 bg-blue-600">
                    <Droppable droppableId={this.props.column.id}>
                        {(provided, snapshot) => (
                            <div ref={provided.innerRef} {...provided.droppableProps} className="mt-6 py-6">
                                {this.props.orders.map((order, index) => {
                                    return (
                                        <OrderCard key={order.id} order={order} index={index} parentCallBack={this.props.parentCallBack} />
                                    )

                                })}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </div>
            </div >
        );
    }
}

export default Column;