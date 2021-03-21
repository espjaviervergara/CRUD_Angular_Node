import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { Producto } from 'src/app/models/producto/producto';
import { ProductoService } from 'src/app/services/producto.service';

@Component({
  selector: 'app-listar-productos',
  templateUrl: './listar-productos.component.html',
  styleUrls: ['./listar-productos.component.css'],
  providers: [ProductoService],
})
export class ListarProductosComponent implements OnInit {
  listProductos: Producto[] = [];
  constructor(private productoService: ProductoService,
              private toastr: ToastrService) { }

  ngOnInit(): void {
    this.obtenerProductos();
  }

  obtenerProductos(): void{
    this.productoService.getProductos().subscribe( (data) => {
      console.log(data);
      this.listProductos = data;
    }, error => {
      console.log(error);
      console.log(error.message);
      console.log('error caragndo datos del http')
    });
  }

  eliminarProducto(id: any): void {
    this.productoService.eliminarProducto(id).subscribe( data =>{
      this.toastr.error('El producto fue eliminado correctamente', 'Producto Eliminado');
      this.obtenerProductos();
    }, error => {
      console.log(error);
    });
  }

}
