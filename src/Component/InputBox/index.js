import { Input, Typography } from "antd";

const InputBox = props => {
    const { 
        label = '',
        width = '80%',
        height = '26px'
} = props
    return (
        <div style={{ display : 'flex', height, width, justifyContent : 'space-between', marginTop : '30px'}}>
            <Typography>
                { label || ''}
            </Typography>
            <Input style={{ width : 'calc(100% - 100px)'}}/>
        </div>
    )

}

export default InputBox