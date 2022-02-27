import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import './header.css';

export default function Header({
                                   dates,
                                   handleStartDateSelect,
                                   handleEndDateSelect
                               }: { dates: { startDate: Date, endDate: Date }, handleStartDateSelect: (newDate: Date) => void; handleEndDateSelect: (newDate: Date) => void }) {
    return (
        <div className={"header"}>
            <h4>Please select range of dates:</h4>
            <table>
                <tbody>
                <tr>
                    <th>
                        from:
                    </th>
                    <th>
                        to:
                    </th>
                </tr>
                <tr>
                    <td>
                        <DatePicker
                            selected={dates.startDate}
                            onChange={handleStartDateSelect}
                        />
                    </td>
                    <td>
                        <DatePicker
                            selected={dates.endDate}
                            onChange={handleEndDateSelect}
                        />
                    </td>
                </tr>
                </tbody>
            </table>
        </div>)
}
