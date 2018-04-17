import React, { Component } from 'react';
import axios     from 'axios'
import Modal from 'react-modal';
import './PokeList.css';

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};

class PokeList extends Component {

	constructor(props) {
		super(props);
		this.state = {
			pokemons : [],
			pokemon: {},
			modalIsOpen: false
		};

		this.openModal = this.openModal.bind(this);
    	this.afterOpenModal = this.afterOpenModal.bind(this);
    	this.closeModal = this.closeModal.bind(this);
	}

	componentDidMount() {

		var self = this;
		
		axios.get('https://pokeapi.co/api/v2/pokemon/')
		.then(function (response) {
			self.setState({ pokemons: response.data.results });
		})
		.catch(function (error) {
			console.log(error);
		});

	}

	openModal() {
		this.setState({modalIsOpen: true});
	}

	afterOpenModal() {

	}

	closeModal() {
		this.setState({ modalIsOpen: false, pokemon: {} });
	}

	onClickPokemon(obj){
		console.log("click element", obj.name)

		var self = this;

		let urlDetail = 'https://pokeapi.co/api/v2/pokemon/' + obj.name
		
		axios.get(urlDetail)
		.then(function (response) {
			self.setState({ pokemon: response.data });
			console.log(response.data)
			self.openModal()
		})
		.catch(function (error) {
			console.log(error);
		});
	}
	


	render() {
		return (
			<div className="PokeList">
				{this.state.pokemons.map(obj => 
		             <div className="poke-item" onClick={() => this.onClickPokemon(obj)}> {obj.name}</div>
		          )}


		         <Modal
			          isOpen={this.state.modalIsOpen}
			          onAfterOpen={this.afterOpenModal}
			          onRequestClose={this.closeModal}
			          style={customStyles}
			          contentLabel="Pokemon Detail"
			        >

			          <button onClick={this.closeModal}>close</button>
			          <div>{JSON.stringify(this.state.pokemon)}</div>
			        </Modal>
			</div>
		);
	}
}

export default PokeList;
