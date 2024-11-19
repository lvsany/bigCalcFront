import * as React from 'react';
import Box from '@mui/material/Box';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import Draggable from 'react-draggable';
import GestureIcon from '@mui/icons-material/Gesture';
import SquareRoundedIcon from '@mui/icons-material/SquareRounded';
import UndoRoundedIcon from '@mui/icons-material/UndoRounded';
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';
import PanToolAltRoundedIcon from '@mui/icons-material/PanToolAltRounded';
import CameraAltIcon from '@mui/icons-material/CameraAlt';

const actions = [
  { icon: <GestureIcon />, name: 'Pencil' },
  { icon: <SquareRoundedIcon />, name: 'Eraser' },
  { icon: <UndoRoundedIcon />, name: 'Undo' },
  { icon: <ClearRoundedIcon />, name: 'Clear' },
  { icon: <CameraAltIcon />, name: 'Screenshot' },  // New action for Screenshot
];


export default function ControlledOpenSpeedDial({ OnAction }) {
  const [open, setOpen] = React.useState(true);
  const [direction, setDirection] = React.useState('right');

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Box sx={{ height: 320, transform: 'translateZ(0px)', flexGrow: 1 }}>
      <Draggable>
        <SpeedDial
          ariaLabel="SpeedDial controlled open example"
          sx={{ position: 'absolute', bottom: 16, right: 16 }}
          icon={<PanToolAltRoundedIcon />}
          onClose={handleClose}
          onOpen={handleOpen}
          direction={direction}
          open={open}
        >
          {actions.map((action) => (
            <SpeedDialAction
              key={action.name}
              icon={action.icon}
              tooltipTitle={action.name}
              onClick={() => {
                OnAction(action.name);
                if (action.name !== 'Undo' && action.name !== 'Clear') {
                  setOpen(false);
                }
              }}
            />
          ))}
        </SpeedDial>
      </Draggable>
    </Box>
  );
}