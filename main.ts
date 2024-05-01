matrix.init(matrix.ePages.y128)

const map = ["##########",
    "#        #",
    "#        #",
    "#        #",
    "#        #",
    "#        #",
    "#        #",
    "#        #",
    "#        #",
    "##########"];

let player_pos = [2, 2];
let player_dir = 0;
let player_fov = matrix.pi() / 3;

function render() {
    matrix.clearMatrix();

    let ray_step = 0.1;
    
    for(let i = 0; i < 128; i++) {
        let ray_angle = player_dir - player_fov / 2 + i * player_fov / 128;
        let ray_pos = player_pos;
        let ray_dist = 0;

        while(map[Math.floor(ray_pos[1])][Math.floor(ray_pos[0])] == " ") {
            ray_pos[0] += Math.cos(player_dir) * ray_step;
            ray_pos[1] += Math.sin(player_dir) * ray_step;
            ray_dist += ray_step;
        }

        let wall_height = 128 / (ray_dist + 0.01);

        let color = 255;
        if(color > 255) {
            color = 255;
        }
        if(color < 0) {
            color = 0;
        }

        if(wall_height > 63) {
            wall_height = 63
        }

        matrix.line(i, 128 / 2 - wall_height / 2, i, 128 / 2 + wall_height / 2, true);
    }

    matrix.displayMatrix();
}

function on_forever() {
    matrix.setPixel(0, 0, true);

    render();

    if(input.buttonIsPressed(Button.B)) {
        player_dir = player_dir + 1;
    }
    if (input.buttonIsPressed(Button.A)) {
        player_dir = player_dir - 1;
    }
}

basic.forever(on_forever);