interface Vector3 {
    x: number;
    y: number;
    z: number;
}
declare function getComponent(vector: Vector3, axis: 'x' | 'y' | 'z'): number;
