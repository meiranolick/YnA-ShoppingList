class ShoppingList extends React.Component {
	constructor(props) {
		super(props);
		this.state = {items: []};
		this.handleItemAddValue = this.handleItemAddValue.bind(this);
		this.handleItemAdd = this.handleItemAdd.bind(this);
		this.handleItemChecked = this.handleItemChecked.bind(this);
		this.handleToggleFocus = this.handleToggleFocus.bind(this);
		this.handleItemNameChanged = this.handleItemNameChanged.bind(this);
		this.handleItemRemoved = this.handleItemRemoved.bind(this);
	}

	handleItemAddValue(e) {
		this.setState({itemAddValue: e.target.value});
	}

	handleItemAdd(e) {
		e.preventDefault();

		let newItem = {name: this.state.itemAddValue, status: "inactive", checked: false, quantity: "", price: "", description: ""};
		let items = this.state.items.slice();
		items.push(newItem);

		this.setState({
			items,
			itemAddValue: ''
		});

		e.target.querySelector('[name="addItem"]').value = '';
	}

	handleItemChecked(index) {
		let items = this.state.items.slice();
		items[index].checked = !items[index].checked;
		this.setState({items});
	}

	handleToggleFocus(index) {
		let items = this.state.items.slice();
		items[index].status = items[index].status == "inactive" ? "active" : "inactive";
		this.setState({items});
	}

	handleItemNameChanged(index, name) {
		let items = this.state.items.slice();
		items[index].name = name;
		this.setState({items});
	}

	handleItemRemoved (index) {
		let items = this.state.items.slice();
		delete items[index];
		this.setState({items});
	}

	render() {
		return (
			<div className="shopping-list">
				<div className="list-header">Add your items here</div>
				<ItemList items={this.state.items} onItemChecked={this.handleItemChecked}
						  onToggleFocus={this.handleToggleFocus}
						  onItemNameChanged={this.handleItemNameChanged}
						  onItemRemoved={this.handleItemRemoved} />
				<form className="addItemBox" onSubmit={this.handleItemAdd}>
					<input name="addItem" placeholder="Add Item" onChange={this.handleItemAddValue} />
				</form>
			</div>
		);
	}
}

class ItemList extends React.Component {
	constructor(props) {
		super(props);
		this.handleItemChecked = this.handleItemChecked.bind(this);
		this.handleToggleFocus = this.handleToggleFocus.bind(this);
		this.handleItemNameChanged = this.handleItemNameChanged.bind(this);
		this.handleItemRemoved = this.handleItemRemoved.bind(this);
	}

	handleItemChecked (index) {
		this.props.onItemChecked(index);
	}

	handleToggleFocus (index) {
		this.props.onToggleFocus(index);
	}

	handleItemNameChanged (index, name) {
		this.props.onItemNameChanged(index, name);
	}

	handleItemRemoved (index) {
		this.props.onItemRemoved(index);
	}

	render() {
		if (this.props.items.length === 0) return null;

		return this.props.items.map(function(item, index){
			return (
				<Item item={item} index={index} key={index} onItemChecked={this.handleItemChecked}
					  onToggleFocus={this.handleToggleFocus}
					  onItemNameChanged={this.handleItemNameChanged}
					  onItemRemoved={this.handleItemRemoved} />
			);
		}.bind(this));
	}
}

class Item extends React.Component {
	constructor(props) {
		super(props);
		this.handleItemChecked = this.handleItemChecked.bind(this);
		this.handleToggleFocus = this.handleToggleFocus.bind(this);
		this.handleItemNameChanged = this.handleItemNameChanged.bind(this);
		this.handleItemRemoved = this.handleItemRemoved.bind(this);
	}

	handleItemChecked () {
		this.props.onItemChecked(this.props.index);
	}

	handleToggleFocus () {
		this.props.onToggleFocus(this.props.index);
	}

	handleItemNameChanged (e) {
		this.props.onItemNameChanged(this.props.index, e.target.value);
	}

	handleItemRemoved () {
		this.props.onItemRemoved(this.props.index);
	}

	render() {
		const item = this.props.item;

		return (
			<div className={"item "+item.status+" "+(item.checked ? "checked" : '')}>
				<input type="checkbox" checked={item.checked} onChange={this.handleItemChecked} />
				<input type="text" className="name" value={item.name} onFocus={this.handleToggleFocus}
					   onBlur={this.handleToggleFocus}
					   onChange={this.handleItemNameChanged} />
				<div className="close-button" onClick={this.handleItemRemoved}>X</div>
			</div>
		);
	}
}

ReactDOM.render(
	<ShoppingList />,
	document.getElementById('root')
);