import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import type { DateFormatType } from '~/types/date'

type SingleDateProp = Date | string
type NullableSingleDateProp = SingleDateProp | null | undefined
type DateProp = NullableSingleDateProp | NullableSingleDateProp[]

interface DateUtilsConfig {
  utc?: boolean
  separator?: string
  format?: DateFormatType
  unique?: boolean
}

export default async function dateUtils() {
  dayjs.extend(utc)

  function getFormat(format?: DateFormatType): string {
    switch (format) {
      case 'shortText':
        return 'ddd DD/MM'
      case 'longText':
        return 'ddd DD/MM/YYYY'
      case 'input':
        return 'YYYY-MM-DD'
      case 'full-input':
        return 'YYYY-MM-DD H:mm:ss'
      case 'default':
      default:
        return 'DD/MM/YYYY'
    }
  }

  function formatDate(date: DateProp, config: DateUtilsConfig = {}): string {
    if (Array.isArray(date)) {
      const formattedDates = date.filter(d => !!d).map(d => formatDate(d, config))
      if (config.unique)
        return [...(new Set(formattedDates))].join(config.separator ?? ', ')
      return formattedDates.join(config.separator ?? ', ')
    }

    if (!date)
      return ''

    return (config.utc ? dayjs.utc(date) : dayjs(date)).format(getFormat(config.format))
  }

  function isBetween(date: SingleDateProp, start: NullableSingleDateProp, end: NullableSingleDateProp, utc = false) {
    const d = utc ? dayjs.utc(date) : dayjs(date)
    return (start ? d.isAfter(start) : true) && (end ? d.isBefore(end) : true)
  }

  return {
    defaultFormat: (date: DateProp, config: DateUtilsConfig = {}) => {
      return formatDate(date, { ...config, format: 'default' })
    },
    shortTextFormat: (date: DateProp, config: DateUtilsConfig = {}) => {
      return formatDate(date, { ...config, format: 'shortText' })
    },
    inputFormat: (date: DateProp, config: DateUtilsConfig = {}) => {
      return formatDate(date, { ...config, format: 'input' })
    },
    inputFullFormat: (date: DateProp, config: DateUtilsConfig = {}) => {
      return formatDate(date, { ...config, format: 'full-input' })
    },
    formatDate,
    isBetween,
  }
}
