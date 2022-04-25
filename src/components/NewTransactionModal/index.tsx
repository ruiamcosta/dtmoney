import { FormEvent, useState } from 'react';
import Modal from 'react-modal';

import incomeImg from '../../assets/income.svg';
import outcomeImg from '../../assets/outcome.svg';
import closeImg from '../../assets/close.svg';
import { api } from '../../services/api';

import { Container, TransactionTypeContainer, RadioBox } from './styles';

interface NewTransactionModalProps {
	isOpen: boolean;
	onRequestClose: () => void;
}

export function NewTransactionModal({ isOpen, onRequestClose }: NewTransactionModalProps) {
	const [title, setTitle] = useState('');
	const [value, setValue] = useState(0);
	const [category, setCategory] = useState('');
	const [type, setType] = useState('deposit');

	function handleCreateNewTransaction(e: FormEvent) {
		e.preventDefault();

		const data = {
			title,
			value,
			category,
			type,
		};

		api.post('/transactions', data);
	}

	return (
		<Modal
			isOpen={isOpen}
			onRequestClose={onRequestClose}
			overlayClassName='react-modal-overlay'
			className='react-modal-content'
		>
			<button type='button' onClick={onRequestClose} className='react-modal-close'>
				<img src={closeImg} alt='Close Modal' />
			</button>

			<Container onSubmit={handleCreateNewTransaction}>
				<h2>Register a transaction</h2>

				<input
					type='text'
					placeholder='Title'
					value={title}
					onChange={e => setTitle(e.target.value)}
				/>

				<input
					type='number'
					placeholder='Price'
					value={value}
					onChange={e => setValue(Number(e.target.value))}
				/>

				<TransactionTypeContainer>
					<RadioBox
						type='button'
						onClick={() => {
							setType('deposit');
						}}
						isActive={type === 'deposit'}
						activeColor='green'
					>
						<img src={incomeImg} alt='Income' />
						<span>Income</span>
					</RadioBox>

					<RadioBox
						type='button'
						onClick={() => {
							setType('withdraw');
						}}
						isActive={type === 'withdraw'}
						activeColor='red'
					>
						<img src={outcomeImg} alt='Outcome' />
						<span>Outcome</span>
					</RadioBox>
				</TransactionTypeContainer>

				<input
					type='text'
					placeholder='Category'
					value={category}
					onChange={e => setCategory(e.target.value)}
				/>

				<button type='submit'>Register</button>
			</Container>
		</Modal>
	);
}
