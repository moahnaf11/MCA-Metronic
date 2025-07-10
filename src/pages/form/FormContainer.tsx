'use client';

import { Fragment } from 'react';
// import { toAbsoluteUrl } from '@/lib/helpers';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { zodResolver } from '@hookform/resolvers/zod';
import { Alert, AlertIcon, AlertTitle } from '@/components/ui/alert';
import { RiCheckboxCircleFill } from '@remixicon/react';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Textarea } from '@/components/ui/textarea';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { Calendar as CalendarIcon, X } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import { useIntl } from 'react-intl';

const FormContainer = () => {

    const intl = useIntl();

    const FormSchema = z.object({
        email: z
            .string()
            .email({
                message: intl.formatMessage({ id: 'FORM.INVALID_EMAIL', defaultMessage: 'Please enter a valid email address.' }),
            })
            .min(1, {
                message: intl.formatMessage({ id: 'FORM.FIELD_REQUIRED', defaultMessage: 'Email is required.' }),
            }),
        userName: z
            .string()
            .min(1, {
                message: intl.formatMessage({ id: 'FORM.FIELD_REQUIRED', defaultMessage: 'Username is required.' }),
            }),
        password: z
            .string()
            .min(6, {
                message: intl.formatMessage({ id: 'FORM.PASSWORD_MIN_LENGTH', defaultMessage: 'Password must be at least 6 characters long.' }),
            })
            .max(20, {
                message: intl.formatMessage({ id: 'FORM.PASSWORD_MAX_LENGTH', defaultMessage: 'Password must not exceed 20 characters.' }),
            }),
        type: z
            .string({
                required_error: intl.formatMessage({ id: 'FORM.FIELD_REQUIRED', defaultMessage: 'Please select a user type.' }),
            }),
        acceptTerms: z.boolean().refine((val) => val === true, {
            message: intl.formatMessage({ id: 'FORM.ACCEPT_TERMS', defaultMessage: 'You must accept the terms and conditions.' }),
        }),
        selectedOption: z.string().nonempty({
            message: intl.formatMessage({ id: 'FORM.FIELD_REQUIRED', defaultMessage: 'You must select an option.' }),
        }),
        message: z.string().min(1).max(500).optional(),
        singleDate: z
            .string()
            .nonempty({ message: intl.formatMessage({ id: 'FORM.FIELD_REQUIRED', defaultMessage: 'Date is required.' }) })
            .refine((val) => !isNaN(Date.parse(val)), {
                message: intl.formatMessage({ id: 'FORM.INVALID_DATE', defaultMessage: 'Please select a valid date.' }),
            }),
        rangeDate: z
            .object({
                from: z.string().optional(),
                to: z.string().optional(),
            })
            .optional()
            .refine(
                (val) =>
                    !val ||
                    (!val.from && !val.to) ||
                    (val.from && val.to && !isNaN(Date.parse(val.from)) && !isNaN(Date.parse(val.to))),
                {
                    message: intl.formatMessage({ id: 'FORM.INVALID_DATE_RANGE', defaultMessage: 'Please select a valid date range.' }),
                    path: ['rangeDate'],
                },
            ),
    });

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            acceptTerms: false,
            selectedOption: '',
            email: '',
            userName: '',
            password: '',
            singleDate: '',
            rangeDate: { from: '', to: '' },
        },
    });

    function onSubmit() {
        toast.custom((t) => (
            <Alert variant="mono" icon="primary" onClose={() => toast.dismiss(t)}>
                <AlertIcon>
                    <RiCheckboxCircleFill />
                </AlertIcon>
                <AlertTitle>
                    {intl.formatMessage({ id: 'FORM.SUBMIT_SUCCESS', defaultMessage: 'Your form has successfully submitted' })}
                </AlertTitle>
            </Alert>
        ));
    }

    return (
        <div className='w-full  h-full'>
            <Fragment>
                <Card className={`h-full`}>
                    <CardContent className="p-10 bg-[length:80%] rtl:[background-position:-70%_25%]
                     [background-position:175%_25%] bg-no-repeat entry-callout-bg">
                        <div className='flex flex-col gap-4'>
                            <Form {...form}>
                                <form onSubmit={form.handleSubmit(onSubmit)} className="w-full flex flex-col gap-3">
                                    <div className='grid grid-cols-1 gap-4 md:grid-cols-3'>
                                        <FormField
                                            control={form.control}
                                            name="email"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>
                                                        {intl.formatMessage({ id: 'FORM.EMAIL', defaultMessage: 'Email' })}
                                                    </FormLabel>
                                                    <FormControl>
                                                        <Input onChange={field.onChange} value={field.value} type='email'
                                                            placeholder={intl.formatMessage({ id: 'FORM.PLACEHOLDER.EMAIL', defaultMessage: 'Enter your email' })} />
                                                    </FormControl>
                                                    <FormDescription>{intl.formatMessage({ id: 'FORM.PLACEHOLDER.EMAIL', defaultMessage: '' })}

                                                    </FormDescription>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="userName"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>{intl.formatMessage({ id: 'FORM.USER_NAME', defaultMessage: 'User Name' })}</FormLabel>
                                                    <FormControl>
                                                        <Input onChange={field.onChange} value={field.value} type='text' placeholder={intl.formatMessage({ id: 'FORM.PLACEHOLDER.USER_NAME', defaultMessage: 'Enter your username' })} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="password"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>{intl.formatMessage({ id: 'FORM.PASSWORD', defaultMessage: 'Password' })}</FormLabel>
                                                    <FormControl>
                                                        <Input onChange={field.onChange} value={field.value} type='password' placeholder={intl.formatMessage({ id: 'FORM.PLACEHOLDER.PASSWORD', defaultMessage: 'Enter your password' })} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                    <div className='grid grid-cols-1 gap-4 md:grid-cols-3'>
                                        <FormField
                                            control={form.control}
                                            name="type"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>{intl.formatMessage({ id: 'FORM.USER_TYPE', defaultMessage: 'User Type' })}</FormLabel>
                                                    <FormControl>
                                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                            <SelectTrigger>
                                                                <SelectValue placeholder={intl.formatMessage({ id: 'FORM.PLACEHOLDER.TYPE', defaultMessage: 'Select user type' })} />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                <SelectItem value="admin">Admin</SelectItem>
                                                                <SelectItem value="employee">Employee</SelectItem>
                                                                <SelectItem value="manager">Manager</SelectItem>
                                                            </SelectContent>
                                                        </Select>
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="singleDate"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>{intl.formatMessage({ id: 'FORM.SINGLE_DATE', defaultMessage: 'Single Date' })}:</FormLabel>
                                                    <FormControl>
                                                        <Popover>
                                                            <PopoverTrigger asChild>
                                                                <div className="relative">
                                                                    <Button
                                                                        type="button"
                                                                        variant="outline"
                                                                        mode="input"
                                                                        placeholder={!field.value}
                                                                        className="w-full"
                                                                    >
                                                                        <CalendarIcon />
                                                                        {field.value ? format(new Date(field.value), 'dd MMM, yyyy') : <span>
                                                                            {intl.formatMessage({ id: 'FORM.PLACEHOLDER.SINGLE_DATE', defaultMessage: 'Select a single date' })}
                                                                        </span>}
                                                                    </Button>
                                                                    {field.value && (
                                                                        <Button
                                                                            type="button"
                                                                            variant="dim"
                                                                            size="sm"
                                                                            className="absolute top-1/2 -end-0 -translate-y-1/2"
                                                                            onClick={(e) => {
                                                                                e.preventDefault();
                                                                                form.setValue('singleDate', '', {
                                                                                    shouldValidate: true,
                                                                                });
                                                                            }}
                                                                        >
                                                                            <X />
                                                                        </Button>
                                                                    )}
                                                                </div>
                                                            </PopoverTrigger>
                                                            <PopoverContent className="w-auto p-0" align="start">
                                                                <Calendar
                                                                    mode="single"
                                                                    selected={field.value ? new Date(field.value) : undefined}
                                                                    onSelect={(date) =>
                                                                        form.setValue('singleDate', date?.toISOString() || '', {
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
                                            name="rangeDate"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>{intl.formatMessage({ id: 'FORM.DATE_RANGE', defaultMessage: 'Date Range' })}:</FormLabel>
                                                    <FormControl>
                                                        <Popover>
                                                            <PopoverTrigger asChild>
                                                                <div className="relative">
                                                                    <Button
                                                                        variant="outline"
                                                                        mode="input"
                                                                        type="button"
                                                                        placeholder={!field.value?.from && !field.value?.to}
                                                                        className="w-full"
                                                                    >
                                                                        <CalendarIcon />
                                                                        {field.value?.from ? (
                                                                            field.value.to ? (
                                                                                `${format(new Date(field.value.from), 'dd MMM, yyyy')} - ${format(new Date(field.value.to), 'dd MMM, yyyy')}`
                                                                            ) : (
                                                                                format(new Date(field.value.from), 'dd MMM, yyyy')
                                                                            )
                                                                        ) : (
                                                                            <span>{intl.formatMessage({ id: 'FORM.PLACEHOLDER.DATE_RANGE', defaultMessage: 'Select date range' })}</span>
                                                                        )}
                                                                    </Button>
                                                                    {field.value?.from && (
                                                                        <Button
                                                                            variant="dim"
                                                                            size="sm"
                                                                            type="button"
                                                                            className="absolute top-1/2 -end-0 -translate-y-1/2"
                                                                            onClick={(e) => {
                                                                                e.preventDefault();
                                                                                form.setValue('rangeDate', { from: '', to: '' }, { shouldValidate: true });
                                                                            }}
                                                                        >
                                                                            <X />
                                                                        </Button>
                                                                    )}
                                                                </div>
                                                            </PopoverTrigger>
                                                            <PopoverContent className="w-auto p-0" align="start">
                                                                <Calendar
                                                                    mode="range"
                                                                    selected={
                                                                        field.value?.from && field.value?.to
                                                                            ? {
                                                                                from: new Date(field.value.from),
                                                                                to: new Date(field.value.to),
                                                                            }
                                                                            : undefined
                                                                    }
                                                                    onSelect={(range) =>
                                                                        form.setValue(
                                                                            'rangeDate',
                                                                            {
                                                                                from: range?.from?.toISOString() || '',
                                                                                to: range?.to?.toISOString() || '',
                                                                            },
                                                                            { shouldValidate: true },
                                                                        )
                                                                    }
                                                                    numberOfMonths={2}
                                                                    autoFocus
                                                                />
                                                            </PopoverContent>
                                                        </Popover>
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                    <div className='grid grid-cols-1 gap-4 md:grid-cols-3'>
                                        <FormField
                                            control={form.control}
                                            name="selectedOption"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>{intl.formatMessage({ id: 'FORM.SELECT_OPTION', defaultMessage: 'Select an option' })}</FormLabel>
                                                    <FormControl>
                                                        <RadioGroup onValueChange={field.onChange} value={field.value}>
                                                            <div className="flex items-center space-x-2">
                                                                <RadioGroupItem value="default" id="default-option" />
                                                                <FormLabel htmlFor="default-option" className="font-normal">
                                                                    Default
                                                                </FormLabel>
                                                            </div>
                                                            <div className="flex items-center space-x-2">
                                                                <RadioGroupItem value="intermediate" id="intermediate-option" />
                                                                <FormLabel htmlFor="intermediate-option" className="font-normal">
                                                                    Intermediate
                                                                </FormLabel>
                                                            </div>
                                                            <div className="flex items-center space-x-2">
                                                                <RadioGroupItem value="advanced" id="advanced-option" />
                                                                <FormLabel htmlFor="advanced-option" className="font-normal">
                                                                    Advanced
                                                                </FormLabel>
                                                            </div>
                                                        </RadioGroup>
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>

                                    <div className='grid grid-cols-1 gap-4 md:grid-cols-3'>
                                        <FormField
                                            control={form.control}
                                            name="message"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>{intl.formatMessage({ id: 'FORM.YOUR_FEEDBACK', defaultMessage: 'Your Feedback' })}</FormLabel>
                                                    <FormControl>
                                                        <Textarea
                                                            placeholder={intl.formatMessage({ id: 'FORM.PLACEHOLDER.FEEDBACK', defaultMessage: 'Type your feedback here...' })} {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                    <div className='grid grid-cols-1 gap-4 md:grid-cols-3'>
                                        <FormField
                                            control={form.control}
                                            name="acceptTerms"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <div className="flex items-center space-x-2">
                                                        <FormControl>
                                                            <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                                                        </FormControl>
                                                        <FormLabel>
                                                            {intl.formatMessage({ id: 'FORM.ACCEPT_TERMS', defaultMessage: 'I accept the terms and conditions' })}
                                                        </FormLabel>
                                                    </div>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                    <div className="flex flex-col py-2 lg:flex-row items-center lg:justify-end gap-2.5">
                                        <Button type="reset" variant="outline" onClick={() => form.reset()}
                                            className='w-full lg:w-36'>
                                            {intl.formatMessage({ id: 'FORM.RESET', defaultMessage: 'Reset' })}
                                        </Button>
                                        <Button type='button' className='w-full lg:w-36'>
                                            {intl.formatMessage({ id: 'FORM.CANCEL', defaultMessage: 'Cancel' })}
                                        </Button>
                                        <Button type='submit' className='w-full lg:w-36'>
                                            {intl.formatMessage({ id: 'FORM.SUBMIT', defaultMessage: 'Submit' })}
                                        </Button>
                                    </div>
                                </form>
                            </Form>
                        </div>
                    </CardContent>
                </Card>
            </Fragment>
        </div>
    );
};


export default FormContainer