import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function Header({
                                   dates,
                                   handleStartDateSelect,
                                   handleEndDateSelect
                               }: { dates: { startDate: Date, endDate: Date }, handleStartDateSelect: (newDate: Date) => void; handleEndDateSelect: (newDate: Date) => void }) {
    return (
        <div>
            <DatePicker
                selected={dates.startDate}
                onChange={handleStartDateSelect}
            />
            <DatePicker
                selected={dates.endDate}
                onChange={handleEndDateSelect}
            />
        </div>)
}
