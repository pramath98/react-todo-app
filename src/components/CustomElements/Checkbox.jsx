import './checkbox.css';

export default function Checkbox({ isChecked = false, id, onChange, label }) {
    return (
        <div className='checkbox-container'>
            <input type='checkbox' title={'mark as done'} value={label} checked={isChecked} id={id} onChange={onChange} />
            {!isChecked ? <label htmlFor={id}>{label}</label> : <del>{label}</del>}

        </div>
    )
}