'use client';

import { Fragment } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { Calendar as CalendarIcon, X } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';

const FormSchema = z.object({
    makeModel: z.string().min(1, 'Make & Model is required.'),
    year: z
        .number({ invalid_type_error: 'Year must be a number.' })
        .gte(1900, 'Year must be after 1900.')
        .lte(new Date().getFullYear() + 1, 'Year cannot be in far future.'),
    vin: z.string().min(1, 'VIN Number is required.'),
    status: z.enum(['Available', 'Sold', 'Upcoming'], { required_error: 'Status is required.' }),
    auctionDate: z
        .string()
        .nonempty('Auction Date is required.')
        .refine((val) => !isNaN(Date.parse(val)), {
            message: 'Please select a valid date.',
        }),
    startingPrice: z.string().min(1, 'Starting price is required.'),
    notes: z.string().max(500).optional(),
});

export default function AddCarForm() {
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            makeModel: '',
            year: new Date().getFullYear(),
            vin: '',
            status: 'Available',
            auctionDate: '',
            startingPrice: '',
            notes: '',
        },
    });

    function onSubmit(values: z.infer<typeof FormSchema>) {
        toast.success(`Car "${values.makeModel}" added successfully!`);
        form.reset();
    }

    return (
        <div className="w-full h-full">
            <Fragment>
                <Card>
                    <CardContent className="p-10">
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                    <FormField
                                        control={form.control}
                                        name="makeModel"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Make & Model</FormLabel>
                                                <FormControl>
                                                    <Input {...field} placeholder="e.g., Toyota Land Cruiser" />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="year"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Year</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        {...field}
                                                        type="number"
                                                        placeholder="e.g., 2021"
                                                        onChange={(e) => field.onChange(Number(e.target.value))}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="vin"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>VIN Number</FormLabel>
                                                <FormControl>
                                                    <Input {...field} placeholder="e.g., JTMJU01J5M4023456" />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="status"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Status</FormLabel>
                                                <FormControl>
                                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Select status" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            <SelectItem value="Available">Available</SelectItem>
                                                            <SelectItem value="Sold">Sold</SelectItem>
                                                            <SelectItem value="Upcoming">Upcoming</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="auctionDate"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Auction Date</FormLabel>
                                                <FormControl>
                                                    <Popover>
                                                        <PopoverTrigger asChild>
                                                            <div className="relative w-full">
                                                                <Button type="button" variant="outline" className="w-full justify-start">
                                                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                                                    {field.value ? format(new Date(field.value), 'dd MMM, yyyy') : 'Select date'}
                                                                </Button>
                                                                {field.value && (
                                                                    <Button
                                                                        type="button"
                                                                        variant="ghost"
                                                                        size="sm"
                                                                        className="absolute top-1/2 right-2 -translate-y-1/2"
                                                                        onClick={(e) => {
                                                                            e.preventDefault();
                                                                            form.setValue('auctionDate', '', { shouldValidate: true });
                                                                        }}
                                                                    >
                                                                        <X />
                                                                    </Button>
                                                                )}
                                                            </div>
                                                        </PopoverTrigger>
                                                        <PopoverContent align="start" className="p-0">
                                                            <Calendar
                                                                mode="single"
                                                                selected={field.value ? new Date(field.value) : undefined}
                                                                onSelect={(date) =>
                                                                    form.setValue('auctionDate', date?.toISOString() || '', {
                                                                        shouldValidate: true,
                                                                    })
                                                                }
                                                                autoFocus
                                                            />
                                                        </PopoverContent>
                                                    </Popover>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="startingPrice"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Starting Price (AED)</FormLabel>
                                                <FormControl>
                                                    <Input {...field} placeholder="e.g., 150,000" />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div className='w-full lg:w-[40%]'>
                                <FormField
                                    control={form.control}
                                    name="notes"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Notes</FormLabel>
                                            <FormControl>
                                                <Textarea {...field} placeholder="Optional notes..." />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                </div>

                                <div className="flex justify-end gap-2">
                                    <Button type="reset" variant="outline" onClick={() => form.reset()}>
                                        Reset
                                    </Button>
                                    <Button type="submit">Add Car</Button>
                                </div>
                            </form>
                        </Form>
                    </CardContent>
                </Card>
            </Fragment>
        </div>
    );
}
