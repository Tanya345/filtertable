import React, { useState } from 'react'

const StudentCard = ({ data, handleAddTag }) => {

	const [toggleGrades, setToggleGrades] = useState('+')
	const [tagValue, setTagValue] = useState('')
	// console.log(data)
	const gradesArr = data.grades;
	let sum = 0;
	var length = gradesArr.length;

	gradesArr.forEach(function (item) {
		let i = Number(item)
		sum += i;
	});

	const avg = sum / length;
	// console.log(data)

	const handleToggleGrades = () => {
		toggleGrades === '+' ? setToggleGrades('-') : setToggleGrades('+')
	}

	const addTag = (e) => {
		if (tagValue) {
			if (e.keyCode === 13) {
				setTagValue('');
				handleAddTag(data.id, e.target.value);
			}
		}
	}

	return (
		<div className="card">
			<div className={`d-flex ${toggleGrades === '+' && 'align-items-center'}`}>
				<div className='imgDiv'>
					<img src={data.pic} className="cardImg" alt="studImg" />
				</div>
				<div className="card-body" >
					<h2 className="card-title text-uppercase">{data.firstName + " " + data.lastName}</h2>
					<p>Email: {data.email}</p>
					<p>Company: {data.company}</p>
					<p>Skill: {data.skill}</p>
					<p>Average: {avg}</p>
					{toggleGrades === '-' && <div>
						<ul>
							{gradesArr.map((grade, i) => {
								return (
									<li style={{ listStyleType: 'none' }} key={i} >Test {i + 1}:<span className='mx-4'>{grade}%</span></li>
								)
							})}
						</ul>
					</div>
					}
					<div className='d-flex flex-row flex-wrap'>
						{data.tag?.map((tag, i) => {
							return (
								<p className='clsTag' key={i}>{tag}</p>
							)
						})}
					</div>
					<input className='filterInp' type='text' placeholder='Add a tag' value={tagValue} onChange={(e) => setTagValue(e.target.value)} onKeyDown={addTag} />
				</div>

			</div>
			<div style={{ fontSize: '3rem', cursor: 'pointer' }} onClick={handleToggleGrades}>{toggleGrades}</div>
		</div >
	)
}

export default React.memo(StudentCard)