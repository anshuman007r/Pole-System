import { Input, Typography } from "antd";

const InputBox = props => {
    const { 
        label = '',
        width = '80%',
        height = '36px',
        ...rest
} = props
    return (
        <div style={{ display : 'flex', height, width, justifyContent : 'space-between', marginTop : '30px', alignItems : 'center'}}>
            <Typography>
                { label || ''}
            </Typography>
            <Input { ...rest} style={{ width : 'calc(100% - 100px)'}}/>
        </div>
    )

}

export default InputBox