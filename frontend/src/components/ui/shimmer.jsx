import React from 'react';
import { Box, Grid, Paper, Skeleton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Stack } from '@mui/material';
 
export const CardShimmer = () => (
    <Paper elevation={0} sx={{ p: 2.5, borderRadius: 2, border: '1px solid #E2E8F0', height: '100%' }}>
        <Stack direction="row" justifyContent="space-between" alignItems="flex-start" mb={2}>
            <Skeleton variant="rectangular" width={40} height={40} sx={{ borderRadius: 1.5 }} animation="wave" />
            <Skeleton variant="rectangular" width={45} height={24} sx={{ borderRadius: 1 }} animation="wave" />
        </Stack>
        <Skeleton variant="text" width="60%" height={40} sx={{ mb: 1 }} animation="wave" />
        <Skeleton variant="text" width="40%" height={20} animation="wave" />
    </Paper>
);
 
export const TableShimmer = ({ rows = 5, columns = 5 }) => (
    <TableContainer component={Paper} elevation={0} sx={{ borderRadius: 0 }}>
        <Table>
            <TableHead>
                <TableRow>
                    {[...Array(columns)].map((_, i) => (
                        <TableCell key={i} sx={{ bgcolor: '#F8FAFC' }}>
                            <Skeleton variant="text" width="60%" animation="wave" />
                        </TableCell>
                    ))}
                </TableRow>
            </TableHead>
            <TableBody>
                {[...Array(rows)].map((_, rowIndex) => (
                    <TableRow key={rowIndex}>
                        {[...Array(columns)].map((_, colIndex) => (
                            <TableCell key={colIndex}>
                                <Skeleton variant="text" width={colIndex === 0 ? "40%" : "80%"} animation="wave" />
                            </TableCell>
                        ))}
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    </TableContainer>
);
 
export const ChartShimmer = () => (
    <Paper elevation={0} sx={{ p: 3, borderRadius: 2, border: '1px solid #E2E8F0', height: 350 }}>
        <Skeleton variant="text" width="30%" height={30} sx={{ mb: 3 }} animation="wave" />
        <Skeleton variant="rectangular" width="100%" height={250} sx={{ borderRadius: 1 }} animation="wave" />
    </Paper>
);
 
const Shimmer = ({ type, rows, columns }) => {
    switch (type) {
        case 'card':
            return <CardShimmer />;
        case 'table':
            return <TableShimmer rows={rows} columns={columns} />;
        case 'chart':
            return <ChartShimmer />;
        default:
            return <Skeleton variant="rectangular" width="100%" height={200} animation="wave" />;
    }
};
 
export default Shimmer;