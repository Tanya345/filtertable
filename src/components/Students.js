import React, { useContext, useState, useReducer, useEffect } from 'react'
import { StudentsContext } from '../App';
import NoCards from './NoCards';
import StudentCard from './StudentCard';

let initialState = {
	name: '',
	tag: ''
}
let runningTimeOut;
let studsArr = [];
const reducerFunction = (state, action) => {
	// console.log(state)
	// console.log(action)
	return { ...state, ...action }
}

const Students = () => {
	const [inputFilterValue, setInputFilterValue] = useState(initialState);
	const [filterValue, setFilterValue] = useReducer(reducerFunction, initialState);

	const { studs, setStuds } = useContext(StudentsContext);


	const debounceOnChange = (e) => {
		const value = e.target.value;
		const id = e.target.id;
		setInputFilterValue({ ...inputFilterValue, [id]: value });
		if (runningTimeOut) clearTimeout(runningTimeOut);
		runningTimeOut = setTimeout(() => {
			setFilterValue({ [id]: value });
		}, 1500);
	}

	studsArr = studs?.filter((stud) => {
		let name = stud.firstName + " " + stud.lastName
		let tags = stud.tag
		let isValidTag = !filterValue.tag || (tags?.some((d) => d.includes(filterValue.tag.toLowerCase())))
		return (
			(name.toLowerCase().includes(filterValue.name.toLowerCase())) && isValidTag
		)
	})

	const handleAddTag = (id, newTag) => {
		let tempStuds = studs.map(stud => {
			if (stud.id === id) {
				let newStud = { ...stud }
				if (newStud.tag === undefined) {
					newStud.tag = [newTag];
					console.log('add tag key and data', stud)
				}
				else {
					newStud.tag = [...newStud.tag, newTag]
					console.log('add tag data', stud)
				}
				return newStud
			}
			return stud
		});
		setStuds(tempStuds)
	}

	return (
		<div className='d-flex flex-wrap flex-column justify-content-evenly my-4 mx-2'>
			<div className='d-flex flex-column' style={{ padding: '12px 20px' }}>
				<input className='filterInp' type='text' id='name' placeholder='Search by name' value={inputFilterValue.name} onChange={debounceOnChange} />
				<input className='filterInp' type='text' id='tag' placeholder='Search by tag' value={inputFilterValue.tag} onChange={debounceOnChange} />
			</div>
			<div style={{ padding: '12px 20px' }}>
				{studsArr.length > 0 ? (studsArr.map((stud, i) => {
					return (
						<React.Fragment key={i}>
							<StudentCard data={stud} handleAddTag={handleAddTag} />
							<hr style={{ color: '#443b3b7d', width: '100%', margin: '0px' }} />
						</React.Fragment>
					)
				})) : <NoCards />}
			</div>
		</div>
	)
}

export default Students