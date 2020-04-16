import React, { Component, Fragment } from 'react';

import CircularBar from 'react-multicolor-circular-progress-bar';
import demo_ok from './static/img/demo_ok.png';
import styles from './static/Demo.module.css';

const getProps =(name)=>{
  const propsObjects={
    circular : {
    fontFamily: 'roboto',
    scale: 2,
    gapGradient: 10,
    angleTransition: [90, 180, 270],
    colors: ['#ff0000', '#ffa500', '#ffff00', '#008000'],
    semiCircular: false,
    title: {
      name: 'bar_title',
      position: {
        X: 0,
        Y: -25
      },
      fontSize: 12,
      fontWeight: 'bold',
      color: '#4e4e4e',
      align: 'middle'
    },
    percent: {
      value: 100,
      showValue: true,
      fontSize: 12,
      fontWeight: 'bold',
      color: '#4e4e4e',
      align: 'middle',
      position: {
        X: 0,
        Y: 30
      }
    },
    image: {
      path: demo_ok,
      width: 30,
      position: {
        X: 0,
        Y: 0
      }
    },
    stroke: {
      color: '#eeeeee',
      width: 5
    },
    ring: {
      bgColor: '#eeeeee',
      width: 2,
      color: '#0000ff',
      padding: 3
    }
    },
    semicircular:{
      fontFamily: 'roboto',
      scale: 2,
      gapGradient: 10,
      angleTransition: [45, 90, 135],
      colors: ['#ff0000', '#ffa500', '#ffff00', '#008000'],
      semiCircular: true,
      title: {
        name: 'bar_title',
        position: {
          X: 0,
          Y: -28
        },
        fontSize: 10,
        fontWeight: 'bold',
        color: '#4e4e4e',
        align: 'middle'
      },
      percent: {
        value: 100,
        showValue: true,
        fontSize: 10,
        fontWeight: 'bold',
        color: '#4e4e4e',
        align: 'middle',
        position: {
          X: 0,
          Y: -4
        }
      },
      image: {
        path: demo_ok,
        width: 13,
        position: {
          X: 0,
          Y: -16
        }
      },
      stroke: {
        color: '#eeeeee',
        width: 5
      },
      ring: {
        bgColor: '#eeeeee',
        width: 2,
        color: '#0000ff',
        padding: 3
      }
    }
  };
  return propsObjects[name]
}

class Demo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      circular: JSON.parse(JSON.stringify(getProps('circular'))),
      semicircular: JSON.parse(JSON.stringify(getProps('semicircular'))),
    };
  }

  handleChange = (event, stateName, element, type, subtype) => {
    const etv=  event.target.value;
    const value = etv === '' || isNaN(etv) ? ['true','false'].includes(etv.toLowerCase()) ? etv=== 'true' : etv :  parseFloat(etv);
   
    const copyOfState= JSON.parse(JSON.stringify( this.state[stateName]));
    if(subtype) copyOfState[element][type][subtype] = value;
    else if(type) copyOfState[element][type] = value;
    else copyOfState[element] = value;

    this.setState( {[stateName]: copyOfState });
  };

  handleArrayChange = (event, stateName, element, idx)=>{
    const etv = event.currentTarget.value;
    const copyOfState= JSON.parse(JSON.stringify( this.state[stateName]));
    const value = element === 'angleTransition' ? parseInt(etv,10): etv;
    copyOfState[element][idx] = value;
    this.setState({[stateName]: copyOfState});
  }

  handleHide =(event, stateName, element)=>{
    const copyOfState= JSON.parse(JSON.stringify( this.state[stateName]));

    if(copyOfState[element] && Object.keys(copyOfState[element]).length >0) copyOfState[element] ={}
    else copyOfState[element] = getProps(stateName)[element];
    this.setState({[stateName]: copyOfState })
  }

  handleAddDeleteColorsAngles =(stateName, action)=>{
    const copyOfState= JSON.parse(JSON.stringify( this.state[stateName]));

    if(action === 'add'){
      copyOfState.colors.length === 0 ? copyOfState.colors.push('#FF0000', '#00FF00') : copyOfState.colors.push('#000000');
      copyOfState.angleTransition.push(copyOfState.semiCircular ? 170 : 340);
    }
    else{
      copyOfState.colors.pop();
      copyOfState.angleTransition.pop();
    }

    this.setState( {[stateName]: copyOfState})
  }
  
  handleReset=(stateName)=>{
    this.setState({[stateName]: getProps(stateName)})
  }

  render() {
    return (
      <div className={[styles.container].join(' ')}>
        {Object.keys(this.state).map(e=>(
          <div className={[styles['main-content'] , styles['flex-row'], styles['flex-align-center'] ].join(' ')} key={e}>
            <Tuning
              tune={this.state[e]}
              id={e}
              handleChange={(event, element, type, subtype)=>this.handleChange(event, e , element, type, subtype)}
              handleArrayChange={(event, element, idx)=>this.handleArrayChange(event, e, element, idx)}
              handleHide ={(event, element)=>this.handleHide(event, e, element)}
              handleAddDeleteColorsAngles= {(action)=>this.handleAddDeleteColorsAngles(e, action) }
            />
            <div className={[styles['flex-column'], styles['flex-align-center'], styles.center].join(' ')}>
              <button className={[styles.element, styles.cursor].join(' ')}onClick={()=>this.handleReset(e)}>Reset</button>
              <CircularBar {...this.state[e]} />
            </div>

        </div>
        ))}
      </div>
    );
  }
}

export default Demo;

const Tuning = ({tune, id, handleChange, handleArrayChange, handleHide, handleAddDeleteColorsAngles})=>{
  const { scale, gapGradient, angleTransition, colors, fontFamily, semiCircular, title, percent, image, stroke, ring } = tune;

  return (
    <div className={[styles['flex-column']].join(' ')}>
      <div className={[styles['flex-row']].join(' ')}>
        <General
          scale={scale}
          semiCircular={semiCircular}
          gapGradient={gapGradient}
          angleTransition={angleTransition}
          colors={colors}
          fontFamily={fontFamily}
          handleChange={handleChange}
          handleArrayChange={handleArrayChange}
          handleAddDeleteColorsAngles={handleAddDeleteColorsAngles}
        />
        <Percent
          percent={percent}
          semiCircular={semiCircular}
          id={id}
          handleChange={(event, type, subtype) => handleChange(event, 'percent', type, subtype)}
        />
        <Stroke
          stroke={stroke}
          handleChange={(event, type, subtype) => handleChange(event, 'stroke', type, subtype)}
        />
      </div>
      <div className={[styles['flex-row']].join(' ')}>
        <Title
          title={title}
          semiCircular={semiCircular}
          id={id}
          handleChange={(event, type, subtype) => handleChange(event, 'title', type, subtype)}
          handleHide={(event) => handleHide(event, 'title')}
        />
        <Image
          image={image}
          semiCircular={semiCircular}
          id={id}
          handleChange={(event, type, subtype) => handleChange(event, 'image', type, subtype)}
          handleHide={(event) => handleHide(event, 'image')}
        />
        <Ring
          ring={ring}
          id={id}
          handleChange={(event, type, subtype) => handleChange(event, 'ring', type, subtype)}
          handleHide={(event) => handleHide(event, 'ring')}
        />
      </div>
    </div>
  );
}

const General = ({ scale, gapGradient, angleTransition, colors, semiCircular, fontFamily, handleChange, handleArrayChange, handleAddDeleteColorsAngles}) => { 
  return (
    <div className={[styles['tuning-element']].join(' ')}>
      <p>General Props</p> 
      <div className={[styles['flex-row'], styles['flex-nowrap'], styles['flex-align-center'], styles.element].join(' ')}>
        <p className={[styles['input-element-left-extra']].join(' ')}>fontFamily:</p>
        <input className={[].join(' ')}
          type='text'
          value={fontFamily}
          onChange={(event) => handleChange(event, 'fontFamily')}
        />
      </div>
      <div className={[styles['flex-row'], styles['flex-nowrap'], styles['flex-align-center'], styles.element].join(' ')}>
        <p className={[styles['input-element-left-extra']].join(' ')}>scale:</p>
        <input className={[styles['input-element-grow'], styles['range-input']].join(' ')}
          type='range'
          min={0.5}
          max={6}
          value={scale}
          step={0.5}
          onChange={(event) => handleChange(event, 'scale')}
        />
        <input className={[styles['input-element-right']].join(' ')}
          type='number'
          min={0.5}
          max={6}
          step={0.5}
          value={scale}
          disabled={true}
          onChange={(event) => handleChange(event, 'scale')}
        />
      </div>
      <div className={[styles['flex-row'], styles['flex-nowrap'], styles['flex-align-center'], styles.element].join(' ')}>
        <p className={[styles['input-element-left-extra']].join(' ')}>gapGradient:</p>
        <input className={[styles['input-element-grow'], styles['range-input']].join(' ')}
          type='range'
          min={0}
          max={100}
          value={gapGradient}
          step={1}
          onChange={(event) => handleChange(event, 'gapGradient')}
        />
        <input className={[styles['input-element-right']].join(' ')}
          type='number'
          min={0}
          max={100}
          step={1}
          value={gapGradient}
          disabled={true}
          onChange={(event) => handleChange(event, 'gapGradient')}
        />
      </div>
      <div className={styles.linea}></div>
      <div className={[styles['flex-row'], styles['flex-nowrap'], styles['flex-justify-center'], styles['buttons-container']].join(' ')}>
        <button className={[styles.cursor].join(' ')} onClick={()=>handleAddDeleteColorsAngles('add')}>Add</button>
        <button className={[styles.cursor].join(' ')} onClick={()=>handleAddDeleteColorsAngles('delete')}>Delete</button>
      </div>
      <div className={[styles['flex-row'], styles['flex-nowrap'], styles['flex-align-center'], styles.element].join(' ')}>
        <p className={[styles['input-element-left-extra']].join(' ')}>colors:</p>
        <div className={[styles['input-element-grow'], styles['flex-row']].join(' ')}>
          {colors.map((e, idx) => (
            <input className={[styles['input-element-color'], styles.cursor].join(' ')}
              key={`colors${idx}_${e}`}
              type='color'
              value={e}
              onChange={(event) => handleArrayChange(event, 'colors', idx)}
            />
          ))}
        </div>
      </div>
      <div className={[styles['flex-row'], styles['flex-nowrap'], styles['flex-align-center'], styles.element].join(' ')}>
        <p className={[styles['input-element-left-extra']].join(' ')}>angleTransition:</p>
        <div className={[styles['input-element-grow']].join(' ')}>
        { angleTransition.map((e, idx) => (
          <div className={[styles['flex-row'], styles['flex-nowrap'], styles['input-array-angle']].join(' ')} key={`angleTransition_${idx}`}>
            <input className={[ styles['input-element-grow'], styles['range-input']].join(' ')}
              type='range'
              min={idx === 0 ? 1 : angleTransition[idx-1] }
              max={idx === angleTransition.length -1 ? semiCircular ? 180 : 360 : angleTransition[idx+1] }
              value={e}
              step={1}
              onChange={(event) =>handleArrayChange(event, 'angleTransition', idx)}
            />
            <input className={[styles['input-element-right']].join(' ')}
              type='number'
              min={idx === 0 ? 1 : angleTransition[idx-1] }
              max={idx === angleTransition.length -1 ? semiCircular ? 180 : 360 : angleTransition[idx+1] }
              step={1}
              value={e}
              disabled={true}
              onChange={(event) => handleArrayChange(event, 'angleTransition', idx)}
            />
          </div>       
        ))}
        </div>
      </div>
      { colors.length !== angleTransition.length +1 ? 
        <div className={[styles['flex-row'], styles['flex-nowrap'], styles['flex-align-center'], styles.element , styles.warning].join(' ')}>¡¡Warning!! Remenber colors elements = angleTransiton elements + 1</div> 
      : null
      }
    </div>
  );
};

const Title =( { title: {name, position, fontSize, fontWeight, color, align }, semiCircular, id, handleChange, handleHide })=>(
  <div className={[styles['tuning-element']].join(' ')}>
    <p>Title</p>
    <div className={[styles['title-check']].join(' ')}>
      <input className={[styles.cursor].join(' ')}
        type='checkbox' 
        name={`title_hidden_${id}`}
        checked={position !== undefined}
        onChange={ handleHide }
      />
    </div>
    {position ? 
    <Fragment>
      <div className={[styles['flex-row'], styles['flex-nowrap'], styles['flex-align-center'], styles.element].join(' ')}>
        <p className={[styles['input-element-left']].join(' ')}>name:</p>
        <input className={[].join(' ')}
          type='text'
          value={name}
          onChange={event => handleChange(event, 'name')}
        />
      </div> 
      <div className={[styles['flex-row'], styles['flex-nowrap'], styles['flex-align-center'], styles.element].join(' ')}>
        <p className={[styles['input-element-left']].join(' ')}>color:</p>
        <input className={[ styles['input-element-color'], styles.cursor].join(' ')}
          type='color'
          value={color}
          onChange={event => handleChange(event,'color')}
        />
      </div>
      <div className={[styles['flex-row'], styles['flex-nowrap'], styles['flex-align-center'], styles.element].join(' ')}>
        <p className={[styles['input-element-left']].join(' ')}>
          fontWeight:
        </p>
        <div className={[styles['flex-row'], styles['flex-nowrap'], styles['flex-align-center'], styles['flex-justify-around'] ,styles['input-element-grow']].join(' ')}>
          <div className={[styles['flex-column'], styles['flex-nowrap'], styles['flex-align-center']].join(' ')}>
            <p>normal</p>
            <input className={[styles['input-element-grow'], styles.cursor].join(' ')}
              type='radio'
              name={`title_fontWeight_${id}`}
              value='normal'
              checked={fontWeight === 'normal'}
              onChange={event => handleChange(event, 'fontWeight')}
            />
          </div>
          <div className={[styles['flex-column'], styles['flex-nowrap'], styles['flex-align-center']].join(' ')}>
            <p>bold</p>
            <input className={[styles['input-element-grow'], styles.cursor].join(' ')}
              type='radio'
              name={`title_fontWeight_${id}`}
              value='bold'
              checked={fontWeight === 'bold'}
              onChange={event => handleChange(event, 'fontWeight') }
            />
          </div>
        </div>
      </div>
      <div className={[styles['flex-row'], styles['flex-nowrap'], styles['flex-align-center'], styles.element].join(' ')}>
        <p className={[styles['input-element-left']].join(' ')}>align:</p>
        <div className={[styles['flex-row'], styles['flex-nowrap'], styles['flex-align-center'], styles['flex-justify-around'] ,styles['input-element-grow']].join(' ')}>
          <div className={[styles['flex-column'], styles['flex-nowrap'], styles['flex-align-center']].join(' ')}>
            <p>start</p>
            <input className={[styles.cursor].join(' ')}
              type='radio'
              name={`title_align_${id}`}
              value='start'
              checked={align === 'start'}
              onChange={event => handleChange(event, 'align')}
            />
          </div>
          <div className={[styles['flex-column'], styles['flex-nowrap'], styles['flex-align-center']].join(' ')}>
            <p>middle</p>
            <input className={[styles.cursor].join(' ')}
              type='radio'
              name={`title_align_${id}`}
              value='middle'
              checked={align === 'middle'}
              onChange={event => handleChange(event, 'align')}
            />
          </div>
          <div className={[styles['flex-column'], styles['flex-nowrap'], styles['flex-align-center']].join(' ')}>
            <p>end</p>
            <input className={[styles.cursor].join(' ')}
              type='radio'
              name={`title_align_${id}`}
              value='end'
              checked={align === 'end'}
              onChange={event => handleChange(event, 'align')}
            />
          </div>
        </div>
      </div>
      <div className={[styles['flex-row'], styles['flex-nowrap'], styles['flex-align-center'], styles.element].join(' ')}>
        <p className={[styles['input-element-left']].join(' ')}>fontSize:</p>
        <input className={[styles['input-element-grow'], styles['range-input']].join(' ')}
          type='range'
          min={5}
          max={50}
          value={fontSize}
          step={1}
          onChange={event => handleChange(event, 'fontSize')}
        />
        <input className={[styles['input-element-right']].join(' ')}
          type='number'
          min={5}
          max={50}
          step={1}
          value={fontSize}
          disabled={true}
          onChange={event => handleChange(event, 'fontSize')}
        />
      </div>
      <div className={[styles['flex-row'], styles['flex-nowrap'], styles['flex-align-center'], styles.element].join(' ')}>
        <p className={[styles['input-element-left']].join(' ')}>X:</p>
        <input className={[styles['input-element-grow'], styles['range-input']].join(' ')}
          type='range'
          min={-50}
          max={50}
          value={position.X}
          step={1}
          onChange={event => handleChange(event, 'position', 'X')}
        />
        <input className={[styles['input-element-right']].join(' ')}
          type='number'
          min={-50}
          max={50}
          step={1}
          value={position.X}
          disabled={true}
          onChange={event => handleChange(event, 'position', 'X')}
        />
      </div>
      <div className={[styles['flex-row'], styles['flex-nowrap'], styles['flex-align-center'], styles.element].join(' ')}>
        <p className={[styles['input-element-left']].join(' ')}>Y:</p>
        <input className={[styles['input-element-grow'], styles['range-input']].join(' ')}
          type='range'
          min={-50}
          max={semiCircular ? 0 : 50}
          value={position.Y}
          step={1}
          onChange={event => handleChange(event, 'position', 'Y')}
        />
        <input className={[styles['input-element-right']].join(' ')}
          type='number'
          min={-50}
          max={semiCircular ? 0 : 50}
          step={1}
          value={position.Y}
          disabled={true}
          onChange={event => handleChange(event, 'position', 'Y')}
        />
      </div>
    </Fragment>
    : null}
    
  </div>
);

const Percent =({ percent: {value, showValue, position, fontSize, fontWeight, color, align }, semiCircular, id, handleChange})=>(
  <div className={[styles['tuning-element']].join(' ')}>
    <p>Percent</p>
    <div className={[styles['flex-row'], styles['flex-nowrap'], styles['flex-align-center'], styles.element].join(' ')}>
      <p className={[styles['input-element-left']].join(' ')}>value:</p>
      <input className={[styles['input-element-grow'], styles['range-input']].join(' ')}
        type='range'
        min={0}
        max={100}
        value={value}
        step={1}
        onChange={event => handleChange(event, 'value')}
      />
      <input className={[styles['input-element-right']].join(' ')}
        type='number'
        min={0}
        max={100}
        step={1}
        value={value}
        disabled={true}
        onChange={event => handleChange(event, 'value')}
      />
    </div>
    <div className={[styles['flex-row'], styles['flex-nowrap'], styles['flex-align-center'], styles.element].join(' ')}>
      <p className={[styles['input-element-left']].join(' ')}>
        showValue:
      </p>
      <div className={[styles['flex-row'], styles['flex-nowrap'], styles['flex-align-center'], styles['flex-justify-around'] ,styles['input-element-grow']].join(' ')}>
        <div className={[styles['flex-column'], styles['flex-nowrap'], styles['flex-align-center']].join(' ')}>
          <p>true</p>
          <input className={[styles['input-element-grow'], styles.cursor].join(' ')}
            type='radio'
            name={`percent_showValue_${id}`}
            value={true}
            checked={showValue === true}
            onChange={event => handleChange(event, 'showValue')}
          />
        </div>
        <div className={[styles['flex-column'], styles['flex-nowrap'], styles['flex-align-center']].join(' ')}>
          <p>false</p>
          <input className={[styles['input-element-grow'], styles.cursor].join(' ')}
            type='radio'
            name={`percent_showValue_${id}`}
            value={false}
            checked={showValue === false}
            onChange={event => handleChange(event, 'showValue') }
          />
        </div>
      </div>
    </div>
    <div className={[styles['flex-row'], styles['flex-nowrap'], styles['flex-align-center'], styles.element, showValue ? null : styles.hidden].join(' ')}>
      <p className={[styles['input-element-left']].join(' ')}>color:</p>
      <input className={[styles['input-element-color'], styles.cursor].join(' ')}
        type='color'
        value={color}
        onChange={event => handleChange(event,'color')}
      />
    </div>
    <div className={[styles['flex-row'], styles['flex-nowrap'], styles['flex-align-center'], styles.element, showValue ? null : styles.hidden].join(' ')}>
      <p className={[styles['input-element-left']].join(' ')}>
        fontWeight:
      </p>
      <div className={[styles['flex-row'], styles['flex-nowrap'], styles['flex-align-center'], styles['flex-justify-around'] ,styles['input-element-grow']].join(' ')}>
        <div className={[styles['flex-column'], styles['flex-nowrap'], styles['flex-align-center']].join(' ')}>
          <p>normal</p>
          <input className={[styles['input-element-grow'], styles.cursor].join(' ')}
            type='radio'
            name={`percent_fontWeight_${id}`}
            value='normal'
            checked={fontWeight === 'normal'}
            onChange={event => handleChange(event, 'fontWeight')}
          />
        </div>
        <div className={[styles['flex-column'], styles['flex-nowrap'], styles['flex-align-center']].join(' ')}>
          <p>bold</p>
          <input className={[styles['input-element-grow'], styles.cursor].join(' ')}
            type='radio'
            name={`percent_fontWeight_${id}`}
            value='bold'
            checked={fontWeight === 'bold'}
            onChange={event => handleChange(event, 'fontWeight') }
          />
        </div>
      </div>
    </div>
    <div className={[styles['flex-row'], styles['flex-nowrap'], styles['flex-align-center'], styles.element, showValue ? null : styles.hidden].join(' ')}>
      <p className={[styles['input-element-left']].join(' ')}>align:</p>
      <div className={[styles['flex-row'], styles['flex-nowrap'], styles['flex-align-center'], styles['flex-justify-around'] ,styles['input-element-grow']].join(' ')}>
        <div className={[styles['flex-column'], styles['flex-nowrap'], styles['flex-align-center']].join(' ')}>
          <p>start</p>
          <input className={[styles.cursor].join(' ')}
            type='radio'
            name={`percent_align_${id}`} 
            value='start'
            checked={align === 'start'}
            onChange={event => handleChange(event, 'align')}
          />
        </div>
        <div className={[styles['flex-column'], styles['flex-nowrap'], styles['flex-align-center']].join(' ')}>
          <p>middle</p>
          <input className={[styles.cursor].join(' ')}
            type='radio'
            name={`percent_align_${id}`} 
            value='middle'
            checked={align === 'middle'}
            onChange={event => handleChange(event, 'align')}
          />
        </div>
        <div className={[styles['flex-column'], styles['flex-nowrap'], styles['flex-align-center']].join(' ')}>
          <p>end</p>
          <input className={[styles.cursor].join(' ')}
            type='radio'
            name={`percent_align_${id}`} 
            value='end'
            checked={align === 'end'}
            onChange={event => handleChange(event, 'align')}
          />
        </div>
      </div>
    </div>
    <div className={[styles['flex-row'], styles['flex-nowrap'], styles['flex-align-center'], styles.element, showValue ? null : styles.hidden].join(' ')}>
      <p className={[styles['input-element-left']].join(' ')}>fontSize:</p>
      <input className={[styles['input-element-grow'], styles['range-input']].join(' ')}
        type='range'
        min={5}
        max={50}
        value={fontSize}
        step={1}
        onChange={event => handleChange(event, 'fontSize')}
      />
      <input className={[styles['input-element-right']].join(' ')}
        type='number'
        min={5}
        max={50}
        step={1}
        value={fontSize}
        disabled={true}
        onChange={event => handleChange(event, 'fontSize')}
      />
    </div>
    <div className={[styles['flex-row'], styles['flex-nowrap'], styles['flex-align-center'], styles.element, showValue ? null : styles.hidden].join(' ')}>
      <p className={[styles['input-element-left']].join(' ')}>X:</p>
      <input className={[styles['input-element-grow'], styles['range-input']].join(' ')}
        type='range'
        min={-50}
        max={50}
        value={position.X}
        step={1}
        onChange={event => handleChange(event, 'position', 'X')}
      />
      <input className={[styles['input-element-right']].join(' ')}
        type='number'
        min={-50}
        max={50}
        step={1}
        value={position.X}
        disabled={true}
        onChange={event => handleChange(event, 'position', 'X')}
      />
    </div>
    <div className={[styles['flex-row'], styles['flex-nowrap'], styles['flex-align-center'], styles.element, showValue ? null : styles.hidden].join(' ')}>
      <p className={[styles['input-element-left']].join(' ')}>Y:</p>
      <input className={[styles['input-element-grow'], styles['range-input']].join(' ')}
        type='range'
        min={-50}
        max={semiCircular ? 0 : 50}
        value={position.Y}
        step={1}
        onChange={event => handleChange(event, 'position', 'Y')}
      />
      <input className={[styles['input-element-right']].join(' ')}
        type='number'
        min={-50}
        max={semiCircular ? 0 : 50}
        step={1}
        value={position.Y}
        disabled={true}
        onChange={event => handleChange(event, 'position', 'Y')}
      />
    </div>
  </div>
);

const Image =({ image:{width, position}, semiCircular, id, handleChange, handleHide})=>(
  <div className={[styles['tuning-element']].join(' ')}>
    <p>Image</p>
    <div className={[styles['title-check']].join(' ')}>
      <input className={[styles.cursor].join(' ')}
        type='checkbox' 
        name={`image_hidden_${id}`}
        checked={position !== undefined}
        onChange={ handleHide }
      />
    </div>
    {position ? 
    <Fragment>
      <div className={[styles['flex-row'], styles['flex-nowrap'], styles['flex-align-center'], styles.element].join(' ')}>
        <p className={[styles['input-element-left']].join(' ')}>width:</p>
        <input className={[styles['input-element-grow'], styles['range-input']].join(' ')}
          type='range'
          min={5}
          max={100}
          value={width}
          step={1}
          onChange={event => handleChange(event, 'width')}
        />
        <input className={[styles['input-element-right']].join(' ')}
          type='number'
          min={5}
          max={50}
          step={1}
          value={width}
          disabled={true}
          onChange={event => handleChange(event, 'width')}
        />
      </div>
      <div className={[styles['flex-row'], styles['flex-nowrap'], styles['flex-align-center'], styles.element].join(' ')}>
        <p className={[styles['input-element-left']].join(' ')}>X:</p>
        <input className={[styles['input-element-grow'], styles['range-input']].join(' ')}
          type='range'
          min={-50}
          max={50}
          value={position.X}
          step={1}
          onChange={event => handleChange(event, 'position', 'X')}
        />
        <input className={[styles['input-element-right']].join(' ')}
          type='number'
          min={-50}
          max={50}
          step={1}
          value={position.X}
          disabled={true}
          onChange={event => handleChange(event, 'position', 'X')}
        />
      </div>
      <div className={[styles['flex-row'], styles['flex-nowrap'], styles['flex-align-center'], styles.element].join(' ')}>
        <p className={[styles['input-element-left']].join(' ')}>Y:</p>
        <input className={[styles['input-element-grow'], styles['range-input']].join(' ')}
          type='range'
          min={-50}
          max={semiCircular ? 0 : 50}
          value={position.Y}
          step={1}
          onChange={event => handleChange(event, 'position', 'Y')}
        />
        <input className={[styles['input-element-right']].join(' ')}
          type='number'
          min={-50}
          max={semiCircular ? 0 : 50}
          step={1}
          value={position.Y}
          disabled={true}
          onChange={event => handleChange(event, 'position', 'Y')}
        />
      </div>
    </Fragment>
    : null}
  </div>
);

const Ring =( { ring: { bgColor, width, color, padding}, id, handleChange, handleHide })=>(
  <div className={[styles['tuning-element']].join(' ')}>
    <p>Ring</p>
    <div className={[styles['title-check']].join(' ')}>
      <input className={[styles.cursor].join(' ')}
        type='checkbox' 
        name={`image_hidden_${id}`}
        checked={bgColor !== undefined}
        onChange={ handleHide }
      />
    </div>
    {bgColor ? 
      <Fragment>
        <div className={[styles['flex-row'], styles['flex-nowrap'], styles['flex-align-center'], styles.element].join(' ')}>
          <p className={[styles['input-element-left']].join(' ')}>bgColor:</p>
          <input className={[styles['input-element-color'], styles.cursor].join(' ')}
            type='color'
            value={bgColor}
            onChange={event => handleChange(event, 'bgColor')}
          />
        </div>
        <div className={[styles['flex-row'], styles['flex-nowrap'], styles['flex-align-center'], styles.element].join(' ')}>
          <p className={[styles['input-element-left']].join(' ')}>Color:</p>
          <input className={[styles['input-element-color'], styles.cursor].join(' ')}
            type='color'
            value={color}
            onChange={event => handleChange(event, 'color')}
          />
        </div>
        <div className={[styles['flex-row'], styles['flex-nowrap'], styles['flex-align-center'], styles.element].join(' ')}>
          <p className={[styles['input-element-left']].join(' ')}>width:</p>
          <input className={[styles['input-element-grow'], styles['range-input']].join(' ')}
            type='range'
            min={0}
            max={100}
            value={width}
            step={1}
            onChange={event => handleChange(event, 'width')}
          />
          <input className={[styles['input-element-right']].join(' ')}
            type='number'
            min={0}
            max={100}
            step={1}
            value={width}
            disabled={true}
            onChange={event => handleChange(event, 'width')}
          />
        </div>
        <div className={[styles['flex-row'], styles['flex-nowrap'], styles['flex-align-center'], styles.element].join(' ')}>
          <p className={[styles['input-element-left']].join(' ')}>padding:</p>
          <input className={[styles['input-element-grow'], styles['range-input']].join(' ')}
            type='range'
            min={0}
            max={100}
            value={padding}
            step={1}
            onChange={event => handleChange(event, 'padding')}
          />
          <input className={[styles['input-element-right']].join(' ')}
            type='number'
            min={0}
            max={100}
            step={1}
            value={padding}
            disabled={true}
            onChange={event => handleChange(event, 'padding')}
          />
        </div>
      </Fragment>
      : null}   
  </div>
);

const Stroke =( { stroke: { width, color }, handleChange })=>(
  <div className={[styles['tuning-element']].join(' ')}>
    <p>Stroke</p>
    <div className={[styles['flex-row'], styles['flex-nowrap'], styles['flex-align-center'], styles.element].join(' ')}>
      <p className={[styles['input-element-left']].join(' ')}>Color:</p>
      <input className={[styles['input-element-color'], styles.cursor].join(' ')}
        type='color'
        value={color}
        onChange={event => handleChange(event, 'color')}
      />
    </div>
    <div className={[styles['flex-row'], styles['flex-nowrap'], styles['flex-align-center'], styles.element].join(' ')}>
      <p className={[styles['input-element-left']].join(' ')}>width:</p>
      <input className={[styles['input-element-grow'], styles['range-input']].join(' ')}
        type='range'
        min={1}
        max={20}
        value={width}
        step={1}
        onChange={event => handleChange(event,  'width')}
      />
      <input className={[styles['input-element-right']].join(' ')}
        type='number'
        min={1}
        max={20}
        step={1}
        value={width}
        disabled={true}
        onChange={event => handleChange(event,  'width')}
      />
    </div>
  </div>
);
