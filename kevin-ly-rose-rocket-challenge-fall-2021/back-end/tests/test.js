/*---- Test cases are written is pseudocode ----*/


test('move order from unassigned to a driver', () => {

    const columns = {
        driverOrders: [],
        unassignedOrders: ['order-1']
    }

    const expected = {
        driverOrders: ['order-1'],
        unassignedOrders: []
    }

    const actual = dragOrder(columns);

    assert.equals(actual, expected);
});

test('unassign order from driver', () => {

    const columns = {
        driverOrders: ['order-1'],
        unassignedOrders: ['order-2']
    }

    const expected = {
        driverOrders: [],
        unassignedOrders: ['order-2', 'order-1']
    }

    const actual = unassignOrderFromDriver(columns);

    assert.equals(actual, expected);
});

test('drag order outside of a droppable box', () => {

    const columns = {
        driverOrders: [],
        unassignedOrders: ['order-2', 'order-1']
    }

    const expected = {
        driverOrders: [],
        unassignedOrders: ['order-2', 'order-1']
    }

    const actual = dragOutsideOfDroppableBox(columns);

    assert.equals(actual, expected);
});

test('drag order from position 1 to position 3 in unassigned orders', () => {

    const columns = {
        driverOrders: [],
        unassignedOrders: ['order-1', 'order-2', 'order-3']
    }

    const expected = {
        driverOrders: [],
        unassignedOrders: ['order-2', 'order-3', 'order-1']
    }

    const actual = dragFromPosition1To3(columns);

    assert.equals(actual, expected);
});

test('drag order from position 3 to 1 in drivers order', () => {

    const columns = {
        driverOrders: ['order-1', 'order-2', 'order-3'],
        unassignedOrders: []
    }

    const expected = {
        driverOrders: ['order-3', 'order-1', 'order-2'],
        unassignedOrders: []
    }

    const actual = dragFromPosition3to1(columns);

    assert.equals(actual, expected);
});

test('drag order from driverA to driverB', () => {

    const drivers = {
        driverAOrders: ['order-1', 'order-2', 'order-3'],
        driverBOrders: []
    }

    const expected = {
        driverAOrders: ['order-2', 'order-3'],
        driverBOrders: ['order-1']
    }

    const actual = dragFromPosition3to1(drivers);

    assert.equals(actual, expected);
});

test('edit to increase cost/revenue of an order by 100', () => {

    const order = {
        cost: 100,
        revenue: 300
    }

    const expected = {
        cost: 200,
        revenue: 400
    }

    const actual = increaseCostAndRevenueBy100(order);

    assert.equals(actual, expected);
});

test('edit the cost of an order with letters', () => {

    const input = {
        cost: 'abc',
        revenue: 123
    }

    const order = {
        cost: 100,
        revenue: 123
    }

    const expected = {
        cost: 100,
        revenue: 123
    }
    const actual = editCostWithLetter(order, input);

    assert.equals(actual, expected);
});

test('edit the revenue of an order with letters', () => {

    const input = {
        cost: 123,
        revenue: 'abc'
    }

    const order = {
        cost: 123,
        revenue: 4000
    }

    const expected = {
        cost: 123,
        revenue: 4000
    }
    const actual = editCostWithLetter(order, input);

    assert.equals(actual, expected);

    assert.equals(actual, expected);
});


//retrieve data from backend
//saving data to backend
//restarting server should keep persisted data
//closing browser and reopening should keep persisted data


//create a new order
//bad data entry
//good data entry
//create a new driver
//bad data entry
//good data entry

//testing driver total cost/revenue calculation

test('clicking edit button on an order', () => {
    
    onClick() {
        this.setState({ isEditing: true });
    };


    const state = {
        isEditing: false
    }

    const actual = clickEditButtonOnOrder(state, onClick())

    assertTrue(actual);
});

test('clicking save button on an order', () => {
   
    onClick() {
        sendNewOrderDetailToBackEnd((response) => {
            this.setState({ 
                isEditing: false,
                data: response.data
            });
        });

    };


    const state = {
        isEditing: true,
        data: null
    };

    const actual = clickEditButtonOnOrder(state, onClick());

    assertFalse(actual.isEditing);
    assertNotNull(actual.data);
});

test('clicking the exit out of forms', () => {
   
    onClick() {
        this.setState({

        })
    };


    const state = {
        isEditing: true,
        data: null
    };

    const actual = clickEditButtonOnOrder(state, onClick());

    assertFalse(actual.isEditing);
    assertNotNull(actual.data);
});