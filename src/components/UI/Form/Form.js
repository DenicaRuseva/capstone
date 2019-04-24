import React from 'react';
import Input from '../../UI/Input/Input';
import Button from '../../UI/Button/Button';
import './Form.css';


const form = (props) => {

        const formClasses = props.formClass ? props.formClass.concat(' form') : 'form';
        const formElementsArray = [];
        for (let key in props.form) {
            formElementsArray.push({
                id: key,
                config: props.form[key]
            });
        }
        let form = (
            <form onSubmit={(event) => {
                event.preventDefault();
                props.onSubmited(event) } }
                > {/*rubric51*/}
                {formElementsArray.map(formElement => (
                    <Input 
                        key={formElement.id}
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.value}
                        invalid={!formElement.config.valid}
                        shouldValidate={formElement.config.validation}
                        touched={formElement.config.touched}
                        changed={(event) => props.inputChanged(event, formElement.id)} 
                        label={formElement.config.label}
                        />
                ))}
                 {/*rubric50*/}
                <Button class={props.btnClass}>{props.btnText}</Button>
            </form>
        );
        return (
            <div className={formClasses}>
                <h4 className='form-header'>{props.formHeader}</h4>
                {form}
            </div>
        );
};


export default form;