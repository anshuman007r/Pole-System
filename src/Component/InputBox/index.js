import { Input, Typography } from "antd";

const InputBox = props => {
    const { 
        label,
        width,
        height,
        inputWidth,
        marginTop,
        labelStyle,
        ...rest
} = props
    return (
        <div style={{ display : 'flex', height, width, justifyContent : 'space-between', marginTop : marginTop || 0, alignItems : 'center'}}>
            <Typography style={{ ...labelStyle}}>
                { label || ''}
            </Typography>
            <Input { ...rest} style={{ width : inputWidth || '100%'}}/>
        </div>
    )

}

InputBox.defaultProps = {
    label : '',
    width : '80%',
    height : '36px',
    inputWidth : '100%',
    marginTop : '30px',
    labelStyle : {}
}

export default InputBox