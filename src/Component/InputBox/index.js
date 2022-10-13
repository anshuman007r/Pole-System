import { Input, Typography } from "antd";

const InputBox = props => {
    const { 
        label,
        width,
        height,
        inputWidth,
        marginTop,
        ...rest
} = props
    return (
        <div style={{ display : 'flex', height, width, justifyContent : 'space-between', marginTop : marginTop || 0, alignItems : 'center'}}>
            <Typography>
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
    marginTop : '30px' 
}

export default InputBox