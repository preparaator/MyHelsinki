import React from 'react';
import { Table } from 'semantic-ui-react';

export default class PlacesRow extends React.Component {

    remove = (event) => {
        this.props.changeToRemoveMode(event.target.name);
    }

    edit = (event) => {
        this.props.changeToEditMode(event.target.id);
    }

    render() {
        return (
            <Table.Row>
                <Table.Cell>{this.props.item.name}</Table.Cell>
                <Table.Cell>{this.props.item.location.address.street_address}</Table.Cell>
                <Table.Cell>{this.props.item.opening_hours ? "Open" : "Closed"}</Table.Cell>
                </Table.Row>
        )
    }
}