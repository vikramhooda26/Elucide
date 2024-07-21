import { DataTable } from '../../components/data-table/DataTable';
import { Button } from '../../components/ui/button';
import AthleteService from '../../services/sports/AthleteService';

function AthleteList() {
  const handleHit = async () => {
    const r = await AthleteService.create({});
    console.log(' r athlete -=- ', r);
  }

  return (
    <div className='border rounded-md w-full p-2'>
      <div>Athlete List</div>
      <Button onClick={handleHit}>
        hit me
      </Button>
      <DataTable />
    </div>
  )
}

export default AthleteList;