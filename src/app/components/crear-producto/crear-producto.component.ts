import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Producto } from 'src/app/models/producto/producto';
import { ProductoService } from 'src/app/services/producto.service';

@Component({
  selector: 'app-crear-producto',
  templateUrl: './crear-producto.component.html',
  styleUrls: ['./crear-producto.component.css']
})
export class CrearProductoComponent implements OnInit {
  productoForm: FormGroup;
  titulo = 'Crear Producto';
  id: string | null;
  constructor(private fb: FormBuilder,
              private route: Router,
              private toastr: ToastrService,
              private productoService: ProductoService,
              private aRouter: ActivatedRoute) {
    this.productoForm = this.fb.group({
      producto: ['', Validators.required],
      categoria: ['', Validators.required],
      ubicacion: ['', Validators.required],
      precio: ['', Validators.required]
    });
    this.id = this.aRouter.snapshot.paramMap.get('id');
   }

  ngOnInit(): void {
    this.esEditar();
  }

  agregarProducto(): void{
    console.log(this.productoForm);

    const PRODUCTO: Producto = {
      nombre: this.productoForm.get('producto')?.value,
      categoria: this.productoForm.get('categoria')?.value,
      ubicacion: this.productoForm.get('ubicacion')?.value,
      precio: this.productoForm.get('precio')?.value
    };

    if (this.id !== null) {
     // editamos
     this.productoService.editarProducto(this.id, PRODUCTO).subscribe( data => {
      this.toastr.info('El producto fue Actualizado correctamente', 'Producto Registrado');
      this.route.navigate(['/']);
     }, error => {
      console.log(error);
      this.productoForm.reset();
     });
    }else {
      // Agregamos
        console.log(PRODUCTO);
        this.productoService.guardarProducto(PRODUCTO).subscribe( data => {
          this.toastr.success('El producto fue registrado correctamente', 'Producto Registrado');
          this.route.navigate(['/']);
        }, error => {
          console.log(error);
          this.productoForm.reset();
        });
    }


  }

  esEditar(): void{
    if (this.id !== null){
      this.titulo = 'Editar Producto';
      this.productoService.obtenerProducto(this.id).subscribe( data => {
        this.productoForm.setValue({
          producto: data.nombre,
          categoria: data.categoria,
          ubicacion: data.ubicacion,
          precio: data.precio
        });
      });
    }
  }

}
