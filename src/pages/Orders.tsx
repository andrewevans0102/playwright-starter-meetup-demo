import { BakedGoods, LOGIN_COOKIE } from '../constants/fieldValues';
import { retrieveCookie } from '../utilities/cookies';
import {
    Box,
    Button,
    MenuItem,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    styled,
} from '@mui/material';
import { useEffect, useState } from 'react';
import PageHeader from '../components/PageHeader';
import PageFooter from '../components/PageFooter';
import Weather from '../components/Weather';

const createData = (
    customerName: string,
    productName: string,
    quantity: number,
    id: number
) => {
    return { customerName, productName, quantity, id };
};

const TextFieldBakedGood = styled(TextField)({
    margin: 20,
});

const WrappedInput = styled('div')({
    // margin: 20,
    display: 'flex',
    // flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
});

const WrappedBox = styled(Box)({
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    margin: 40,
    border: 'solid',
    borderColor: 'white',
    padding: 20,
    backgroundColor: 'white',
});

const Orders = () => {
    const [userName, setUserName] = useState<string | null | undefined>('');
    const [rows, setRows] = useState<any>([]);
    const [formProduct, setFormProduct] = useState('');
    const [formQuantity, setFormQuantity] = useState(0);
    useEffect(() => {
        if (userName === '') {
            setUserName(retrieveCookie(LOGIN_COOKIE));
        }
    }, []);

    const handleDelete = (id: number) => {
        const originalValue = rows;
        const updatedValue = originalValue.filter(
            (value: any) => value.id !== id
        );
        setRows(updatedValue);
    };

    const handleCreateOrder = () => {
        const updatedRows = rows;
        const formId = updatedRows.length + 1;
        updatedRows.push({
            customerName: userName,
            productName: formProduct,
            quantity: formQuantity,
            id: formId,
        });
        setRows(updatedRows);
        setFormProduct('');
        setFormQuantity(0);
    };

    // when page loads populate with values
    // this would normally be done with an API call
    useEffect(() => {
        setRows([
            createData('Earl of Grantham', BakedGoods.MUFFIN, 4, 0),
            createData('Lady Mary Crawley', BakedGoods.CINNAMON_BUN, 1, 1),
            createData('Lady Edith Crawley', BakedGoods.SCONE, 8, 2),
            createData('Mr. Carson', BakedGoods.CROISSANT_ROLE, 1, 3),
            createData('Mrs. Hughes', BakedGoods.PUMPKIN_PIE, 10, 4),
        ]);
    }, []);

    return (
        <>
            <div>
                <PageHeader />
                <WrappedBox
                    component="form"
                    sx={{
                        '& .MuiTextField-root': { m: 1, width: '25ch' },
                    }}
                >
                    <WrappedInput>
                        <TextFieldBakedGood
                            id="outlined-select-currency"
                            select
                            label="Baked Good"
                            defaultValue={BakedGoods.MUFFIN}
                            style={{ backgroundColor: 'white' }}
                            onChange={(event) => {
                                setFormProduct(event.target.value);
                            }}
                            value={formProduct}
                        >
                            {Object.keys(BakedGoods).map((option: string) => (
                                <MenuItem
                                    key={option}
                                    value={
                                        BakedGoods[
                                            option as keyof typeof BakedGoods
                                        ]
                                    }
                                >
                                    {
                                        BakedGoods[
                                            option as keyof typeof BakedGoods
                                        ]
                                    }
                                </MenuItem>
                            ))}
                        </TextFieldBakedGood>
                        <TextFieldBakedGood
                            id="outlined-number"
                            label="Quantity"
                            type="number"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            value={formQuantity ? formQuantity : 0}
                            onChange={(event) => {
                                console.log(event.target.value);
                                setFormQuantity(parseInt(event.target.value));
                            }}
                        />
                    </WrappedInput>
                    <Button variant="contained" onClick={handleCreateOrder}>
                        Create Order
                    </Button>
                </WrappedBox>

                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Customer Name</TableCell>
                                <TableCell align="right">Product</TableCell>
                                <TableCell align="right">Quantity</TableCell>
                                <TableCell align="right">Delete</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row: any) => (
                                <TableRow
                                    key={row.customerName}
                                    sx={{
                                        '&:last-child td, &:last-child th': {
                                            border: 0,
                                        },
                                    }}
                                >
                                    <TableCell component="th" scope="row">
                                        {row.customerName}
                                    </TableCell>
                                    <TableCell align="right">
                                        {row.productName}
                                    </TableCell>
                                    <TableCell align="right">
                                        {row.quantity}
                                    </TableCell>
                                    <TableCell align="right">
                                        <Button
                                            variant="contained"
                                            color="error"
                                            onClick={() => handleDelete(row.id)}
                                        >
                                            Delete
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
            <Weather />
            <PageFooter />
        </>
    );
};

export default Orders;
